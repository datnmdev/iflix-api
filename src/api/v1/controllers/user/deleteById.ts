import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'

import userSevice from '../../services/userService'

const deleteById = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    await userSevice.findByIdAndDelete(new Types.ObjectId(req.params.id), session)

    await session.commitTransaction()
    await session.endSession()
    
    return res.status(200).json({
      status: 'OK',
      message: 'The user information has been deleted'
    })
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    return res.status(500).json(error)
  }
}

export default deleteById