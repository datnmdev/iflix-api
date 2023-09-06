import { Router } from 'express'

import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import episodeController from '../controllers/episode'
import episodeValidator from '../validations/episode'
import multer from '../../../config/multer'

const episodeRouter = Router()

episodeRouter.get('/', episodeController.getAll)

episodeRouter.get('/:id', episodeValidator.getById, episodeController.getById)

episodeRouter.post('/', multer.episodeUpload, episodeValidator.create, authentication.authenticateAccessToken, authorization.episode.create, episodeController.create)

episodeRouter.put('/:id', multer.episodeUpload, episodeValidator.updateById, authentication.authenticateAccessToken, authorization.episode.updateById, episodeController.updateById)

episodeRouter.delete('/:id', episodeValidator.deleteById, authentication.authenticateAccessToken, authorization.episode.deleteById, episodeController.deleteById)

export default episodeRouter