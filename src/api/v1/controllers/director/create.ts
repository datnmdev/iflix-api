import { Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'

import IDirector from '../../interfaces/entities/IDirector'
import directorService from '../../services/director'
import multer from '../../../../config/multer'

dotenv.config()

const UPLOADS_DIRECTOR_PATH = process.env.UPLOADS_DIRECTOR_PATH as string

const create = async (req: Request, res: Response) => {
  multer.directorAvatarUpload.single('avatar')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        status: 'Internal Server Error'
      })
    }

    try {
      const directorData: IDirector = req.body

      if (req.file) {
        directorData.avatar = path.join(UPLOADS_DIRECTOR_PATH, req.params.id + '.' + req.file.mimetype.split('/')[1])
      }
  
      await directorService.create(directorData)
  
      return res.status(201).json({
        status: 'Created',
        message: 'Director created successfully'
      })
    } catch (error) {
      return res.status(500).json({
        status: 'Internal Server Error',
        message: 'The director hasn\'t been created successfully' 
      })
    }
  })

}

export default create