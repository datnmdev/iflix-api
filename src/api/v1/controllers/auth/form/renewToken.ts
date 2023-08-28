import { Request, Response } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { redisClient } from '../../../../../config/redis'
import IRequestUser from '../../../interfaces/orthers/IRequestUser'

dotenv.config()

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY as string
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY as string

const renewToken = async (req: Request, res: Response) => {
  const user: IRequestUser = req.user as IRequestUser

  try {
    const refreshToken = (req.headers['authorization'] as string).split(' ')[1]

    // Verify the refresh token in Redis
    const refreshTokenInRedis = await redisClient.get(refreshToken + ':' + user.id.toString())
    if (refreshTokenInRedis) {
      await redisClient.del([refreshToken + ':' + user.id.toString()])

      // Generate a access token and refresh token
      const newAccessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_SECRET_KEY, { expiresIn: '2h' })
      const newRefreshToken = jwt.sign({ id: user.id, role: user.role }, REFRESH_SECRET_KEY, { expiresIn: '2w' })

      // Store the new refresh token in redis
      await redisClient.setEx(newRefreshToken + ':' + user.id.toString(), 14*24*60*60, newRefreshToken)

      // Send the new access token and new refresh token to the user
      return res.status(201).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      })
    }

    return res.status(401).json({
      message: 'Unauthorized: Invalid tokens'
    })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default renewToken