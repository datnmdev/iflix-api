import { Router } from 'express'

import historyValidator from '../validations/history'
import historyController from '../controllers/history'
import securityMiddlware from '../middlewares/security'

const historyRouter = Router()

historyRouter.get('/', historyValidator.getByUserIdAndDate, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.history.getByUserIdAndDate, historyController.getByUserIdAndDate)

historyRouter.post('/', historyValidator.create, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.history.create, historyController.create)

export default historyRouter