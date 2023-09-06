import { Router } from 'express'

import episodeController from '../controllers/episode'
import episodeValidator from '../validations/episode'
import multer from '../../../config/multer'
import securityMiddlware from '../middlewares/security'

const episodeRouter = Router()

episodeRouter.get('/', episodeController.getAll)

episodeRouter.get('/:id', episodeValidator.getById, episodeController.getById)

episodeRouter.post('/', multer.episodeUpload, episodeValidator.create, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.episode.create, episodeController.create)

episodeRouter.put('/:id', multer.episodeUpload, episodeValidator.updateById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.episode.updateById, episodeController.updateById)

episodeRouter.delete('/:id', episodeValidator.deleteById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.episode.deleteById, episodeController.deleteById)

export default episodeRouter