import { Express } from 'express'

import jwtPassportConfig from './jwt'

export default function passportConfig(app: Express) {
  jwtPassportConfig(app)
}