import { Request, Response } from 'express'
import { Types } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

import castService from '../../services/cast'
import ICast from '../../interfaces/entities/ICast'

dotenv.config()

const UPLOADS_CAST_PATH = process.env.UPLOADS_CAST_PATH as string

const updateById = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      req.body.avatar = path.join(UPLOADS_CAST_PATH, req.params.id + '.' + req.file.mimetype.split('/')[1])
      await fs.promises.rename(req.file.path, path.join('public', req.body.avatar))
    }

    await castService.findByIdAndUpdate(new Types.ObjectId(req.params.id), req.body as ICast)

    return res.status(200).json({
      status: 'OK',
      message: 'The cast has been updated'
    })
  } catch (error) {
    // Delete the successfully uploaded file (if any) previously
    if (req.body.avatar) {
      const avatarPath = path.join(process.cwd(), 'public', req.body.avatar)
      try {
        await fs.promises.access(avatarPath, fs.constants.F_OK)
        await fs.promises.unlink(avatarPath)
      } catch (error) {
        // console.log(error)
      }
    } else if (req.file) {
      const avatarPath = path.join(process.cwd(), req.file.path)
      try {
        await fs.promises.access(avatarPath, fs.constants.F_OK)
        await fs.promises.unlink(avatarPath)
      } catch (error) {
        // console.log(error)
      }
    }

    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The cast wasn\'t updated successfully'
    })
  }
}

export default updateById