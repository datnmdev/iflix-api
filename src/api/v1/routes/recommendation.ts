import { Router } from 'express'

import recommendationController from '../controllers/recommendation'
import securityMiddlware from '../middlewares/security'

const recommendationRouter = Router()

recommendationRouter.get('/collaborationFiltering', securityMiddlware.authentication.authenticateAccessToken, recommendationController.collaborationFiltering)

export default recommendationRouter