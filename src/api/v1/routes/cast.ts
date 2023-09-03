import { Router } from 'express'

import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import castController from '../controllers/cast'
import castValidator from '../validations/cast'
import multer from '../../../config/multer'

const castRouter = Router()

castRouter.get('/', castController.getAll)

castRouter.get('/:id', castController.getById)

castRouter.post('/', multer.castAvatarUpload, castValidator.create, authentication.authenticateAccessToken, authorization.cast.create, castController.create)

castRouter.put('/:id', multer.castAvatarUpload, castValidator.updateById, authentication.authenticateAccessToken, authorization.cast.updateById, castController.updateById)

castRouter.delete('/:id', authentication.authenticateAccessToken, authorization.cast.deleteById, castController.deleteById)

export default castRouter