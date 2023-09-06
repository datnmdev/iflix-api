import { Router } from 'express'

import followController from '../controllers/follow'
import followValidator from '../validations/follow'
import securityMiddlware from '../middlewares/security'

const followRouter = Router()

followRouter.get('/', followValidator.getByMovieIdAndUserId, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.follow.getByMovieIdAndUserId, followController.getByMovieIdAndUserId, securityMiddlware.authorization.follow.getByUserId, followController.getByUserId)

followRouter.post('/', followValidator.create, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.follow.create, followController.create)

followRouter.delete('/', followValidator.deleteByMovieIdAndUserId, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.follow.deleteByMovieIdAndUserId, followController.deleteByMovieIdAndUserId)

export default followRouter