import { Router } from 'express'
import { createValidator } from 'express-joi-validation'

import securityMiddlware from '../middlewares/security'
import userController from '../controllers/user'
import { updateByIdSchema } from '../validations/user'
import errorHandlerMiddleware from '../middlewares/error'
import multer from '../../../config/multer'

const userRouter = Router()
const validator = createValidator({ passError: true })

userRouter.use(securityMiddlware.authentication.authenticateAccessToken)

userRouter.get('/', securityMiddlware.authorization.user.getAll, userController.getAll)

userRouter.get('/:id', securityMiddlware.authorization.user.getById, userController.getById)

userRouter.put('/:id', validator.body(updateByIdSchema), securityMiddlware.authorization.user.updateById, userController.updateById, errorHandlerMiddleware.validationErrorHandler)

userRouter.delete('/:id', securityMiddlware.authorization.user.deleteById, userController.deleteById)

export default userRouter