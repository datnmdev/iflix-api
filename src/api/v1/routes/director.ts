import { Router } from 'express'

import directorController from '../controllers/director'
import directorValidator from '../validations/director'
import multer from '../../../config/multer'
import securityMiddlware from '../middlewares/security'

const directorRouter = Router()

directorRouter.get('/', directorController.getAll)

directorRouter.get('/:id', directorController.getById)

directorRouter.post('/', multer.directorAvatarUpload, directorValidator.create, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.director.create, directorController.create)

directorRouter.put('/:id', multer.directorAvatarUpload, directorValidator.updateById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.director.updateById, directorController.updateById)

directorRouter.delete('/:id', directorValidator.deleteById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.director.deleteById, directorController.deleteById)

export default directorRouter