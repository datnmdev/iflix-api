import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'

import countryService from '../../services/country'

const deleteById = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    await countryService.findByIdAndDelete(new Types.ObjectId(req.params.id), session)

    await session.commitTransaction()
    await session.endSession()

    return res.status(200).json({
      status: 'OK',
      message: 'The country has been deleted successfully'
    })
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The country hasn\'t been deleted successfully',
      error
    })
  }
}

export default deleteById