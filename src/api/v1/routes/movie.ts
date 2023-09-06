import { Router } from 'express'

import movieController from '../controllers/movie'
import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import movieValidator from '../validations/movie'
import multer from '../../../config/multer'

const movieRouter = Router()

movieRouter.get('/', movieController.getAll)

movieRouter.get('/:id', movieValidator.getById, movieController.getById)

movieRouter.post('/', multer.posterUpload, movieValidator.create, authentication.authenticateAccessToken, authorization.movie.create, movieController.create)

movieRouter.put('/:id', multer.posterUpload, movieValidator.updateById, authentication.authenticateAccessToken, authorization.movie.updateById, movieController.updateById)

movieRouter.delete('/:id', movieValidator.deleteById, authentication.authenticateAccessToken, authorization.movie.deleteById, movieController.deleteById)

export default movieRouter