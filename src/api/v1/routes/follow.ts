import { Router } from 'express'

import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import followController from '../controllers/follow'
import followValidator from '../validations/follow'

const followRouter = Router()

followRouter.get('/', followValidator.getByMovieIdAndUserId, authentication.authenticateAccessToken, authorization.follow.getByMovieIdAndUserId, followController.getByMovieIdAndUserId, authorization.follow.getByUserId, followController.getByUserId)

followRouter.post('/', followValidator.create, authentication.authenticateAccessToken, authorization.follow.create, followController.create)

followRouter.delete('/', authentication.authenticateAccessToken, authorization.follow.deleteByMovieIdAndUserId, followController.deleteByMovieIdAndUserId)

export default followRouter