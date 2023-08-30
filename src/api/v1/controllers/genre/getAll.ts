import { Request, Response } from 'express'

import genreService from '../../services/genre'

const getAll = async (req: Request, res: Response) => {
  try {
    const genres = await genreService.findAll()

    return res.status(200).json(genres)
  } catch (error) {
    return res.status(500).json({ 
      status: 'Internal Server Error',
      message: 'Undefined error from the server'
    })
  }
  
}

export default getAll