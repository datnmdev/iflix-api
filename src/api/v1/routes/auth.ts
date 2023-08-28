import { Router } from 'express'
import { createValidator } from 'express-joi-validation'

import authController from '../controllers/auth'
import securityMiddlware from '../middlewares/security'
import validationErrorHandler from '../middlewares/error/validation'
import { signInSchema, signUpSchema } from '../validations/auth'

const authRouter = Router()
const validator = createValidator({ passError: true })

authRouter.post('/form/signin', validator.body(signInSchema), authController.form.signIn, validationErrorHandler)

authRouter.post('/form/signup', validator.body(signUpSchema), authController.form.signUp, validationErrorHandler)

authRouter.post('/refreshToken', securityMiddlware.authentication.authenticateRefreshToken, authController.form.renewToken)

export default authRouter