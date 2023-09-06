import { Router } from 'express'

import directorController from '../controllers/director'
import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import directorValidator from '../validations/director'
import multer from '../../../config/multer'

const directorRouter = Router()

directorRouter.get('/', directorController.getAll)

directorRouter.get('/:id', directorController.getById)

directorRouter.post('/', multer.directorAvatarUpload, directorValidator.create, authentication.authenticateAccessToken, authorization.director.create, directorController.create)

directorRouter.put('/:id', multer.directorAvatarUpload, directorValidator.updateById, authentication.authenticateAccessToken, authorization.director.updateById, directorController.updateById)

directorRouter.delete('/:id', directorValidator.deleteById, authentication.authenticateAccessToken, authorization.director.deleteById, directorController.deleteById)

export default directorRouter