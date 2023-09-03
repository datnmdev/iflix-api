import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const UPLOADS_DIRECTOR_PATH = process.env.UPLOADS_DIRECTOR_PATH as string
const DIRECTOR_MAX_SIZE = Number(process.env.DIRECTOR_MAX_SIZE)

export default function directorAvatarUpload(req: Request, res: Response, next: NextFunction) {
  const storage = multer.diskStorage({
    destination: path.join('public', UPLOADS_DIRECTOR_PATH)
  })
  
  multer({
    storage,
    limits: {
      files: 1,
      fileSize: DIRECTOR_MAX_SIZE
    }
  }).single('avatar')(req, res, err => {
    if (err) {
      return res.status(500).json(err)
    }
    return next()
  }) 
}