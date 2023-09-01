import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

import castService from '../../services/cast'

dotenv.config()

const CAST_AVATAR_DEFAULT = process.env.CAST_AVATAR_DEFAULT as string

const deleteById = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedCast = await castService.findByIdAndDelete(new Types.ObjectId(req.params.id), session)

    if (deletedCast && !deletedCast.avatar?.endsWith(CAST_AVATAR_DEFAULT)) {
      const avatarPath = path.join(process.cwd(), 'public', deletedCast.avatar as string)
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath)
      }
    }

    await session.commitTransaction()
    await session.endSession()

    return res.status(200).json({
      status: 'OK',
      message: 'The director has been deleted successfully'
    })
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The director hasn\'t been deleted successfully',
      error
    })
  }
}

export default deleteById