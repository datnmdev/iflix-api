import { Request, Response } from 'express'

import rateService from '../../services/rate'

const getAll = async (req: Request, res: Response) => {
  try {
    const rates = await rateService.findAll()

    return res.status(200).json(rates)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getAll