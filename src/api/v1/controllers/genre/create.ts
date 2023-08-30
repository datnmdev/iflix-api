import { Request, Response } from 'express'

import IGenre from '../../interfaces/entities/IGenre'
import genreService from '../../services/genre'

const create = async (req: Request, res: Response) => {
  try {
    const genreData: IGenre = req.body

    await genreService.create(genreData)

    return res.status(201).json({
      status: 'Created',
      message: 'Genre created successfully'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The genre hasn\'t been created successfully' 
    })
  }
}

export default create