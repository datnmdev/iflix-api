import { Router } from 'express'

import recommendationController from '../controllers/recommendation'

const recommendationRouter = Router()

// recommendationRouter.get('/', recommendationController)

recommendationRouter.get('/:movieId', recommendationController.similar)

export default recommendationRouter