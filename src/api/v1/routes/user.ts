import { Router } from 'express'

import securityMiddlware from '../middlewares/security'
import userController from '../controllers/user'
import userValidator from '../validations/user'
import multer from '../../../config/multer'

const userRouter = Router()

userRouter.get('/', securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.user.getAll, userController.getAll)

userRouter.get('/profile', securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.user.getProfile, userController.getProfile)

userRouter.get('/:id', userValidator.getById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.user.getById, userController.getById)

userRouter.put('/:id', multer.userAvatarUpload, userValidator.updateById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.user.updateById, userController.updateById)

userRouter.delete('/:id', userValidator.deleteById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.user.deleteById, userController.deleteById)

export default userRouter