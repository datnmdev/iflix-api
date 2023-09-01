import { Request, Response } from 'express'
import { Types } from 'mongoose'
import countryService from '../../services/country'
import ICountry from '../../interfaces/entities/ICountry'

const updateById = async (req: Request, res: Response) => {
  try {

    await countryService.findByIdAndUpdate(new Types.ObjectId(req.params.id), req.body as ICountry)

    return res.status(200).json({
      status: 'OK',
      message: 'The country has been updated'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The country wasn\'t updated successfully'
    })
  }
}

export default updateById