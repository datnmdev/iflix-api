import { Router } from 'express'

import scheduleController from '../controllers/schedule'

const scheduleRouter = Router()

scheduleRouter.get('/', scheduleController.getAll)

export default scheduleRouter