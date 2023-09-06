import { Router } from 'express'

import movieController from '../controllers/movie'
import movieValidator from '../validations/movie'
import multer from '../../../config/multer'
import securityMiddlware from '../middlewares/security'

const movieRouter = Router()

movieRouter.get('/', movieController.getAll)

movieRouter.get('/:id', movieValidator.getById, movieController.getById)

movieRouter.post('/', multer.posterUpload, movieValidator.create, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.movie.create, movieController.create)

movieRouter.put('/:id', multer.posterUpload, movieValidator.updateById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.movie.updateById, movieController.updateById)

movieRouter.delete('/:id', movieValidator.deleteById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.movie.deleteById, movieController.deleteById)

export default movieRouter