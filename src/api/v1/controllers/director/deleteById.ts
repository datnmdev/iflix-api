import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

import directorService from '../../services/director'

dotenv.config()

const DIRECTOR_AVATAR_DEFAULT = process.env.DIRECTOR_AVATAR_DEFAULT as string

const deleteById = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedDirector = await directorService.findByIdAndDelete(new Types.ObjectId(req.params.id), session)

    if (!deletedDirector!.avatar!.endsWith(DIRECTOR_AVATAR_DEFAULT)) {
      const avatarPath = path.join(process.cwd(), 'public', deletedDirector!.avatar as string)
      await fs.promises.access(avatarPath, fs.constants.F_OK)
      await fs.promises.unlink(avatarPath)
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