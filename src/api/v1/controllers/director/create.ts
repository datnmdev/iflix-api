import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

import IDirector from '../../interfaces/entities/IDirector'
import directorService from '../../services/director'

dotenv.config()

const UPLOADS_DIRECTOR_PATH = process.env.UPLOADS_DIRECTOR_PATH as string

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const directorData: IDirector = req.body

    const savedDirector = await directorService.create(directorData)

    if (req.file) {
      savedDirector.avatar = path.join(UPLOADS_DIRECTOR_PATH, savedDirector._id.toString() + '.' + req.file.mimetype.split('/')[1])
      await savedDirector.save()
      await fs.promises.rename(req.file.path, path.join('public', savedDirector.avatar))
    }

    return res.status(201).json({
      status: 'Created',
      message: 'Director created successfully'
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
      message: 'The director hasn\'t been created successfully'
    })
  }

}

export default create