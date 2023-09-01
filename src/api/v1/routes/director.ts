import { Router } from 'express'
import { createValidator } from 'express-joi-validation'

import directorController from '../controllers/director'
import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import errorHandlerMiddleware from '../middlewares/error'
import { updateByIdSchema } from '../validations/director'

const directorRouter = Router()
const validator = createValidator({ passError: true })

directorRouter.get('/', directorController.getAll)

directorRouter.get('/:id', directorController.getById)

directorRouter.post('/', authentication.authenticateAccessToken, authorization.director.create, directorController.create)

directorRouter.put('/:id', validator.body(updateByIdSchema), authentication.authenticateAccessToken, authorization.director.updateById, directorController.updateById, errorHandlerMiddleware.validationErrorHandler)

directorRouter.delete('/:id', authentication.authenticateAccessToken, authorization.director.deleteById, directorController.deleteById)

export default directorRouter