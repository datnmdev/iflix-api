import { Request, Response } from 'express'
import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import userSevice from '../../../services/user'
import passwordCredentialService from '../../../services/password'
import { redisClient } from '../../../../../config/redis'
import IPasswordCredential from '../../../interfaces/entities/IPasswordCredential'

dotenv.config()

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY as string
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY as string

// Login using a username and password
const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await userSevice.findByUsername(username)

    if (user) {
      const passwordCredential = await passwordCredentialService.findByUserId(user._id as Types.ObjectId) as IPasswordCredential

      // Verify the password using bcrypt
      const isVerifedPassword = await bcrypt.compare(password, passwordCredential.password)

      if (isVerifedPassword) {
        // Generate access token and refresh token for the user
        const accessToken = jwt.sign({ id: user._id, role: user.role }, ACCESS_SECRET_KEY, { expiresIn: '2h' })
        const refreshToken = jwt.sign({ id: user._id, role: user.role }, REFRESH_SECRET_KEY, { expiresIn: '2w' })

        // Store the new refresh token in redis
        await redisClient.setEx(refreshToken + ':' + user._id?.toString(), 14*24*60*60, refreshToken)

        // Send the tokens to the user
        return res.status(200).json({
          accessToken,
          refreshToken
        })
      }
    }

    // The password verification has not succeeded
    return res.status(401).json({
      message: 'Login failed. Please check your username and password.'
    })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default signIn