import { Router } from 'express'

import evaluationController from '../controllers/evaluation'

const evaluationRouter = Router()

evaluationRouter.post('/', evaluationController.create)

export default evaluationRouter