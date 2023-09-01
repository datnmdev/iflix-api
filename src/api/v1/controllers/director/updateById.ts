import { Request, Response } from 'express'
import { Types } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

import directorService from '../../services/director'
import IDirector from '../../interfaces/entities/IDirector'
import multer from '../../../../config/multer'

dotenv.config()

const UPLOADS_DIRECTOR_PATH = process.env.UPLOADS_DIRECTOR_PATH as string

const updateById = async (req: Request, res: Response) => {
  multer.directorAvatarUpload.single('avatar')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        status: 'Internal Server Error'
      })
    }

    try {
      req.body.avatar = path.join(UPLOADS_DIRECTOR_PATH, req.params.id + '.' + req.file?.mimetype.split('/')[1])
  
      await directorService.findByIdAndUpdate(new Types.ObjectId(req.params.id), req.body as IDirector)
  
      return res.status(200).json({
        status: 'OK',
        message: 'The director has been updated'
      })
    } catch (error) { 
      // Delete the successfully uploaded file (if any) previously
      if (req.body.avatar) {
        const avatarPath = path.join(process.cwd(), 'public', req.body.avatar)
        if (fs.existsSync(avatarPath)) {
          fs.unlinkSync(avatarPath)
        }
      }

      return res.status(500).json({
        status: 'Internal Server Error',
        message: 'The director wasn\'t updated successfully'
      })
    }
  })
}

export default updateById