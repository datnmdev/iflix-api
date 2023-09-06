import { Router } from 'express'

import countryController from '../controllers/country'
import countryValidator from '../validations/country'
import securityMiddlware from '../middlewares/security'


const countryRouter = Router()

countryRouter.get('/', countryController.getAll)

countryRouter.get('/:id', countryController.getById)

countryRouter.post('/', securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.country.create, countryController.create)

countryRouter.put('/:id', countryValidator.updateById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.country.updateById, countryController.updateById)

countryRouter.delete('/:id', countryValidator.deleteById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.country.deleteById, countryController.deleteById)

export default countryRouter