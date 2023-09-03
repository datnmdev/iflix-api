import { Router } from 'express'

import authentication from '../middlewares/security/authentication'
import rateValidator from '../validations/rate'
import authorization from '../middlewares/security/authorization'
import rateController from '../controllers/rate'

const rateRouter = Router()

rateRouter.get('/', rateValidator.getByMovieIdAndUserId, authentication.authenticateAccessToken, authorization.rate.getByMovieIdAndUserId, rateController.getByMovieIdAndUserId)

rateRouter.post('/', rateValidator.create, authentication.authenticateAccessToken, authorization.rate.create, rateController.create)

rateRouter.put('/', rateValidator.updateByMovieIdAndUserId, authentication.authenticateAccessToken, authorization.rate.updateByMovieIdAndUserId, rateController.updateByMovieIdAndUserId)

export default rateRouter