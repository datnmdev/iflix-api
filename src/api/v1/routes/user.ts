import { Router } from 'express'

import securityMiddlware from '../middlewares/security'
import userController from '../controllers/user'
import userValidator from '../validations/user'
import multer from '../../../config/multer'

const userRouter = Router()

userRouter.use(securityMiddlware.authentication.authenticateAccessToken)

userRouter.get('/', securityMiddlware.authorization.user.getAll, userController.getAll)

userRouter.get('/:id', securityMiddlware.authorization.user.getById, userController.getById)

userRouter.put('/:id', multer.userAvatarUpload, userValidator.updateById, securityMiddlware.authorization.user.updateById, userController.updateById)

userRouter.delete('/:id', securityMiddlware.authorization.user.deleteById, userController.deleteById)

export default userRouter