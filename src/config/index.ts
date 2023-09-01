import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import redisConfig from './redis'
import passportConfig from './passport'
import databaseConfig from './database'
import authRouter from '../api/v1/routes/auth'
import userRouter from '../api/v1/routes/user'
import errorHandlerMiddleware from '../api/v1/middlewares/error'
import genreRouter from '../api/v1/routes/genre'
import directorRouter from '../api/v1/routes/director'

export default function appConfig(app: Express) {
  // Common configs
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(express.static('public'))

  // Authentication and authorization configs
  databaseConfig()
  redisConfig()
  passportConfig(app)

  // Router configs
  app.use('/auth', authRouter)
  app.use('/users', userRouter)
  app.use('/genres', genreRouter)
  app.use('/directors', directorRouter)

  // Middlewares configs
  app.use(errorHandlerMiddleware.commonErrorHandler)
}