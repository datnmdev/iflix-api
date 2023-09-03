import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

import ICast from '../../interfaces/entities/ICast'
import castService from '../../services/cast'

dotenv.config()

const UPLOADS_CAST_PATH = process.env.UPLOADS_CAST_PATH as string

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const castData: ICast = req.body

    const savedCast = await castService.create(castData)

    if (req.file) {
      savedCast.avatar = path.join(UPLOADS_CAST_PATH, savedCast._id.toString() + '.' + req.file.mimetype.split('/')[1])
      await savedCast.save()
      await fs.promises.rename(req.file.path, path.join('public', savedCast.avatar))
    }

    return res.status(201).json({
      status: 'Created',
      message: 'Cast created successfully'
    })
  } catch (error) {
    // Delete the successfully uploaded file (if any) previously
    if (req.body.avatar) {
      const avatarPath = path.join(process.cwd(), 'public', req.body.avatar)
      try {
        await fs.promises.access(avatarPath, fs.constants.F_OK)
        await fs.promises.unlink(avatarPath)
      } catch (error) {
        next(error)
      }
    } else if (req.file) {
      const avatarPath = path.join(process.cwd(), req.file.path)
      try {
        await fs.promises.access(avatarPath, fs.constants.F_OK)
        await fs.promises.unlink(avatarPath)
      } catch (error) {
        next(error)
      }
    }

    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The cast hasn\'t been created successfully'
    })
  }
}

export default create