import { Request, Response } from 'express'
import { Types } from 'mongoose'

import movieService from '../../services/movie'

const getById = async (req: Request, res: Response) => {
  try {
    const movie = await movieService.findById(new Types.ObjectId(req.params.id))

    return res.status(200).json(movie)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getById