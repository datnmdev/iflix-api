import { Express } from 'express'

import accessTokenPassportConfig from './access'
import refreshTokenPassportConfig from './refresh'

export default function jwtPassportConfig(app: Express) {
  accessTokenPassportConfig(app)
  refreshTokenPassportConfig(app)
}