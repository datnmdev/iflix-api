import { Router } from 'express'

import castController from '../controllers/cast'
import castValidator from '../validations/cast'
import multer from '../../../config/multer'
import securityMiddlware from '../middlewares/security'

const castRouter = Router()

castRouter.get('/', castController.getAll)

castRouter.get('/:id', castController.getById)

castRouter.post('/', multer.castAvatarUpload, castValidator.create, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.cast.create, castController.create)

castRouter.put('/:id', multer.castAvatarUpload, castValidator.updateById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.cast.updateById, castController.updateById)

castRouter.delete('/:id', castValidator.deleteById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.cast.deleteById, castController.deleteById)

export default castRouter