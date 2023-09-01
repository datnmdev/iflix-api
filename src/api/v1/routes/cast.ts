import { Router } from 'express'
import { createValidator } from 'express-joi-validation'

import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import errorHandlerMiddleware from '../middlewares/error'
import castController from '../controllers/cast'
import { updateByIdSchema } from '../validations/cast'

const castRouter = Router()
const validator = createValidator({ passError: true })

castRouter.get('/', castController.getAll)

castRouter.get('/:id', castController.getById)

castRouter.post('/', authentication.authenticateAccessToken, authorization.cast.create, castController.create)

castRouter.put('/:id', validator.body(updateByIdSchema), authentication.authenticateAccessToken, authorization.cast.updateById, castController.updateById, errorHandlerMiddleware.validationErrorHandler)

castRouter.delete('/:id', authentication.authenticateAccessToken, authorization.cast.deleteById, castController.deleteById)

export default castRouter