import { Router } from 'express'

import genreController from '../controllers/genre'
import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'

const genreRouter = Router()

genreRouter.get('/', genreController.getAll)

genreRouter.post('/', authentication.authenticateAccessToken, authorization.genre.create, genreController.create)

genreRouter.put('/:id', authentication.authenticateAccessToken, authorization.genre.updateById, genreController.updateById)

genreRouter.delete('/:id', authentication.authenticateAccessToken, authorization.genre.deleteById, genreController.deleteById)

export default genreRouter