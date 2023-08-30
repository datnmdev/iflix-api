import { Request, Response } from 'express'

import IGenre from '../../interfaces/entities/IGenre'
import genreService from '../../services/genre'
import { Types } from 'mongoose'

const updateById = async (req: Request, res: Response) => {
  try {
    await genreService.findByIdAndUpdate(new Types.ObjectId(req.params.id), req.body as IGenre)

    return res.status(200).json({
      status: 'OK',
      message: 'The genre has been updated'
    })
  } catch (error) { 
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The genre wasn\'t updated successfully'
    })
  }
}

export default updateById