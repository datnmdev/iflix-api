import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { redisClient } from '../../../../../config/redis'
import userSevice from '../../../services/userService'
import passwordCredentialService from '../../../services/passwordCredentialService'
import ISignUp from '../../../interfaces/orthers/ISignUp'

dotenv.config()

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY as string
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY as string

const signUp = async (req: Request, res: Response) => {
  const bodyData: ISignUp = req.body

  // Create a session to work with transactions in Mongoose
  const session = await mongoose.connection.startSession()

  try {
    // Initiate the transaction in the mongoose
    session.startTransaction()

    let user = null

    if (bodyData.username) {
      user = await userSevice.findByUsername(bodyData.username)
    }

    if (user) {
      return res.status(409).json({
        message: 'Username already exists'
      })
    }

    // Create and store the information of the user in the database
    const userData = {
      username: bodyData.username,
      name: {
        first: bodyData.name.first,
        last: bodyData.name.last
      },
      email: bodyData.email,
      role: 'user'
    }

    const savedUser = await userSevice.createUser(userData, session)

    // Create and store the password credential information in the database after saving the user information
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(bodyData.password, salt)
    const passwordCredentialData = {
      password: hashedPassword,
      salt: salt,
      user: savedUser._id
    }

    await passwordCredentialService.createPasswordCredential(passwordCredentialData, session)

    // Generate access token and refresh token for the user
    const accessToken = jwt.sign({ id: savedUser._id, role: savedUser.role }, ACCESS_SECRET_KEY, { expiresIn: '2h' })
    const refreshToken = jwt.sign({ id: savedUser._id, role: savedUser.role }, REFRESH_SECRET_KEY, { expiresIn: '2w' })

    // Store the new refresh token in redis
    await redisClient.setEx(refreshToken + ':' + savedUser._id.toString(), 14*24*60*60, refreshToken)

    await session.commitTransaction()
    await session.endSession()

    // Send the access token and refresh token to the user
    return res.status(201).json({
      accessToken,
      refreshToken
    })

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    return res.status(500).json(error)
  }
}

export default signUp