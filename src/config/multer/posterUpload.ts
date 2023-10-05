import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const UPLOADS_POSTER_PATH = process.env.UPLOADS_POSTER_PATH as string
const POSTER_MAX_SIZE = Number(process.env.POSTER_MAX_SIZE)

export default function posterUpload(req: Request, res: Response, next: NextFunction) {
  const storage = multer.diskStorage({
    destination: path.join('public', UPLOADS_POSTER_PATH)
  })
  
  multer({
    storage,
    limits: {
      files: 1,
      fileSize: POSTER_MAX_SIZE
    }
  }).single('poster')(req, res, err => {
    if (err) {
      return res.status(500).json(err)
    }
    return next()
  }) 
}