import { Request, Response } from 'express'

import countryService from '../../services/country'

const getAll = async (req: Request, res: Response) => {
  try {
    const casts = (await countryService.findAll())

    return res.status(200).json(casts)
  } catch (error) {
    return res.status(500).json({ 
      status: 'Internal Server Error',
      message: 'Undefined error from the server'
    })
  }
  
}

export default getAll