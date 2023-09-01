import { Router } from 'express'
import { createValidator } from 'express-joi-validation'

import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import errorHandlerMiddleware from '../middlewares/error'
import countryController from '../controllers/country'
import { updateByIdSchema } from '../validations/country'

const countryRouter = Router()
const validator = createValidator({ passError: true })

countryRouter.get('/', countryController.getAll)

countryRouter.get('/:id', countryController.getById)

countryRouter.post('/', authentication.authenticateAccessToken, authorization.country.create, countryController.create)

countryRouter.put('/:id', validator.body(updateByIdSchema), authentication.authenticateAccessToken, authorization.country.updateById, countryController.updateById, errorHandlerMiddleware.validationErrorHandler)

countryRouter.delete('/:id', authentication.authenticateAccessToken, authorization.country.deleteById, countryController.deleteById)

export default countryRouter