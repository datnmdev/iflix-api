import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const UPLOADS_VIDEO_PATH = process.env.UPLOADS_VIDEO_PATH as string
const VIDEO_MAX_SIZE = Number(process.env.VIDEO_MAX_SIZE)

export default function episodeUpload(req: Request, res: Response, next: NextFunction) {
  const storage = multer.diskStorage({
    destination: path.join('public', UPLOADS_VIDEO_PATH)
  })
  
  multer({
    storage,
    limits: {
      files: 1,
      fileSize: VIDEO_MAX_SIZE
    }
  }).single('episode')(req, res, err => {
    if (err) {
      return res.status(500).json(err)
    }
    return next()
  }) 
}