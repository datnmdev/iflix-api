import { Request, Response } from 'express'
import { Types } from 'mongoose'

import genreService from '../../services/genre'

const getById = async (req: Request, res: Response) => {
  try {
    const genre = await genreService.findById(new Types.ObjectId(req.params.id))

    return res.status(200).json(genre)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getById