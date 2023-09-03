import { Router } from 'express'

import genreController from '../controllers/genre'
import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import genreValidator from '../validations/genre'

const genreRouter = Router()

genreRouter.get('/', genreController.getAll)

genreRouter.get('/:id', genreController.getById)

genreRouter.post('/', authentication.authenticateAccessToken, authorization.genre.create, genreController.create)

genreRouter.put('/:id', genreValidator.updateById, authentication.authenticateAccessToken, authorization.genre.updateById, genreController.updateById)

genreRouter.delete('/:id', authentication.authenticateAccessToken, authorization.genre.deleteById, genreController.deleteById)

export default genreRouter