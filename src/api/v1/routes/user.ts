import { Router } from 'express'

import securityMiddlware from '../middlewares/security'
import authorization from '../middlewares/security/authorization/user'
import userController from '../controllers/user'

const userRouter = Router()

userRouter.use(securityMiddlware.authentication.authenticateAccessToken)

userRouter.get('/', authorization.getAll, userController.getAll)

export default userRouter