import { Router } from 'express'

import genreController from '../controllers/genre'
import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import genreValidator from '../validations/genre'

const genreRouter = Router()

genreRouter.get('/', genreController.getAll)

genreRouter.get('/:id', genreValidator.getById, genreController.getById)

genreRouter.post('/', genreValidator.create, authentication.authenticateAccessToken, authorization.genre.create, genreController.create)

genreRouter.put('/:id', genreValidator.updateById, authentication.authenticateAccessToken, authorization.genre.updateById, genreController.updateById)

genreRouter.delete('/:id', genreValidator.deleteById, authentication.authenticateAccessToken, authorization.genre.deleteById, genreController.deleteById)

export default genreRouter