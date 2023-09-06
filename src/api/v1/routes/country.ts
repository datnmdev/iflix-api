import { Router } from 'express'

import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import countryController from '../controllers/country'
import countryValidator from '../validations/country'

const countryRouter = Router()

countryRouter.get('/', countryController.getAll)

countryRouter.get('/:id', countryController.getById)

countryRouter.post('/', authentication.authenticateAccessToken, authorization.country.create, countryController.create)

countryRouter.put('/:id', countryValidator.updateById, authentication.authenticateAccessToken, authorization.country.updateById, countryController.updateById)

countryRouter.delete('/:id', countryValidator.deleteById, authentication.authenticateAccessToken, authorization.country.deleteById, countryController.deleteById)

export default countryRouter