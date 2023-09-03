import { Router } from 'express'

import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import followController from '../controllers/follow'

const followRouter = Router()

followRouter.use(authentication.authenticateAccessToken)

followRouter.get('/', authorization.follow.getByUserId, followController.getByUserId)

followRouter.post('/', authorization.follow.create, followController.create)

followRouter.delete('/:id', authorization.follow.deleteByUserIdAndMovieId, followController.deleteByUserIdAndMovieId)

export default followRouter