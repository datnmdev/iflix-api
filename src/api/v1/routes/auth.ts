import { Router } from 'express'

import authController from '../controllers/auth'
import securityMiddlware from '../middlewares/security'
import authValidator from '../validations/auth'

const authRouter = Router()

authRouter.post('/form/signin', authValidator.signIn, authController.form.signIn)

authRouter.post('/form/signup', authValidator.signUp, authController.form.signUp)

authRouter.post('/refreshToken', securityMiddlware.authentication.authenticateRefreshToken, authController.form.renewToken)

authRouter.post('/logout', securityMiddlware.authentication.authenticateRefreshToken, authController.form.logout)

export default authRouter