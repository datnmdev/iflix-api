import { Router } from 'express'

import genreController from '../controllers/genre'
import genreValidator from '../validations/genre'
import securityMiddlware from '../middlewares/security'

const genreRouter = Router()

genreRouter.get('/', genreController.getAll)

genreRouter.get('/:id', genreValidator.getById, genreController.getById)

genreRouter.post('/', genreValidator.create, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.genre.create, genreController.create)

genreRouter.put('/:id', genreValidator.updateById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.genre.updateById, genreController.updateById)

genreRouter.delete('/:id', genreValidator.deleteById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.genre.deleteById, genreController.deleteById)

export default genreRouter