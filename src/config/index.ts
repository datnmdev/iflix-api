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
import castRouter from '../api/v1/routes/cast'
import countryRouter from '../api/v1/routes/country'
import movieRouter from '../api/v1/routes/movie'
import followRouter from '../api/v1/routes/follow'
import rateRouter from '../api/v1/routes/rate'
import episodeRouter from '../api/v1/routes/episode'
import historyRouter from '../api/v1/routes/history'
import commentRouter from '../api/v1/routes/comment'

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
  app.use('/casts', castRouter)
  app.use('/countries', countryRouter)
  app.use('/movies', movieRouter)
  app.use('/follows', followRouter)
  app.use('/rates', rateRouter)
  app.use('/episodes', episodeRouter)
  app.use('/histories', historyRouter)
  app.use('/comments', commentRouter)

  // Middlewares configs
  app.use(errorHandlerMiddleware.commonErrorHandler)
}