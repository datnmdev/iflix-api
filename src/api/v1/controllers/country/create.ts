import { Request, Response } from 'express'

import ICountry from '../../interfaces/entities/ICountry'
import countryService from '../../services/country'

const create = async (req: Request, res: Response) => {
  try {
    await countryService.create(req.body as ICountry)

    return res.status(201).json({
      status: 'Created',
      message: 'Country created successfully'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The country hasn\'t been created successfully'
    })
  }
}

export default create