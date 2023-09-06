import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

import userSevice from '../../services/user'

dotenv.config()

const USER_AVATAR_DEFAULT = process.env.USER_AVATAR_DEFAULT as string

const deleteById = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedUser = await userSevice.findByIdAndDelete(new Types.ObjectId(req.params.id), session)

    if (!deletedUser!.avatar!.endsWith(USER_AVATAR_DEFAULT)) {
      const avatarPath = path.join(process.cwd(), 'public', deletedUser!.avatar as string)
      await fs.promises.access(avatarPath, fs.constants.F_OK)
      await fs.promises.unlink(avatarPath)
    }

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