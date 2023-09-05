import { Router } from 'express'

import historyValidator from '../validations/history'
import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import historyController from '../controllers/history'

const historyRouter = Router()

historyRouter.get('/', historyValidator.getByUserIdAndDate, authentication.authenticateAccessToken, authorization.history.getByUserIdAndDate, historyController.getByUserIdAndDate)

historyRouter.post('/', historyValidator.create, authentication.authenticateAccessToken, authorization.history.create, historyController.create)

export default historyRouter