import { Express } from 'express'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import userSevice from '../../../api/v1/services/user'

dotenv.config()

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY as string

// Define the JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_SECRET_KEY
}

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userSevice.findById(payload.id)

    if (user) {
      return done(null, { id: user._id, role: user.role })
    }
    return done(null, false)
  } catch (error) {
    return done(error)
  }
})

export default function accessTokenPassportConfig(app: Express) {
  app.use(bodyParser.json())
  passport.use('accessTokenJwt', jwtStrategy)
  app.use(passport.initialize())
}



