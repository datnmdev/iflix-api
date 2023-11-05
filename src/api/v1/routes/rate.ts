import { Router } from 'express'

import rateValidator from '../validations/rate'
import rateController from '../controllers/rate'
import securityMiddlware from '../middlewares/security'

const rateRouter = Router()

rateRouter.get('/', rateValidator.getByMovieIdAndUserId, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.rate.getByMovieIdAndUserId, rateController.getByMovieIdAndUserId, rateController.getAll)

rateRouter.post('/', rateValidator.create, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.rate.create, rateController.create)

rateRouter.put('/', rateValidator.updateByMovieIdAndUserId, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.rate.updateByMovieIdAndUserId, rateController.updateByMovieIdAndUserId)

export default rateRouter