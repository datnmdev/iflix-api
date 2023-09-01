import { Router } from 'express'
import { createValidator } from 'express-joi-validation'

import genreController from '../controllers/genre'
import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import { updateByIdSchema } from '../validations/genre'
import errorHandlerMiddleware from '../middlewares/error'

const genreRouter = Router()
const validator = createValidator({ passError: true })

genreRouter.get('/', genreController.getAll)

genreRouter.get('/:id', genreController.getById)

genreRouter.post('/', authentication.authenticateAccessToken, authorization.genre.create, genreController.create)

genreRouter.put('/:id', validator.body(updateByIdSchema), authentication.authenticateAccessToken, authorization.genre.updateById, genreController.updateById, errorHandlerMiddleware.validationErrorHandler)

genreRouter.delete('/:id', authentication.authenticateAccessToken, authorization.genre.deleteById, genreController.deleteById)

export default genreRouter