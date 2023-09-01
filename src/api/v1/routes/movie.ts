import { Router } from 'express'

import movieController from '../controllers/movie'

const movieRouter = Router()

movieRouter.get('/', movieController.getAll)

export default movieRouter