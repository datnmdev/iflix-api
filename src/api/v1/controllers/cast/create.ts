import { Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'

import multer from '../../../../config/multer'
import ICast from '../../interfaces/entities/ICast'
import castService from '../../services/cast'

dotenv.config()

const UPLOADS_CAST_PATH = process.env.UPLOADS_CAST_PATH as string

const create = async (req: Request, res: Response) => {
  multer.castAvatarUpload.single('avatar')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        status: 'Internal Server Error'
      })
    }

    try {
      const castData: ICast = req.body

      if (req.file) {
        castData.avatar = path.join(UPLOADS_CAST_PATH, req.params.id + '.' + req.file.mimetype.split('/')[1])
      }
  
      await castService.create(castData)
  
      return res.status(201).json({
        status: 'Created',
        message: 'Cast created successfully'
      })
    } catch (error) {
      return res.status(500).json({
        status: 'Internal Server Error',
        message: 'The cast hasn\'t been created successfully' 
      })
    }
  })

}

export default create