import { Request, Response } from 'express'

import directorService from '../../services/director'

const getAll = async (req: Request, res: Response) => {
  try {
    const directors = (await directorService.findAll())

    return res.status(200).json(directors)
  } catch (error) {
    return res.status(500).json({ 
      status: 'Internal Server Error',
      message: 'Undefined error from the server'
    })
  }
  
}

export default getAll