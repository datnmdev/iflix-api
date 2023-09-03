import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const UPLOADS_CAST_PATH = process.env.UPLOADS_CAST_PATH as string
const CAST_MAX_SIZE = Number(process.env.CAST_MAX_SIZE)

export default function castAvatarUpload(req: Request, res: Response, next: NextFunction) {
  const storage = multer.diskStorage({
    destination: path.join('public', UPLOADS_CAST_PATH)
  })
  
  multer({
    storage,
    limits: {
      files: 1,
      fileSize: CAST_MAX_SIZE
    }
  }).single('avatar')(req, res, err => {
    if (err) {
      return res.status(500).json(err)
    }
    return next()
  }) 
}