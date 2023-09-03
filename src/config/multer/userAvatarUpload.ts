import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const UPLOADS_USER_PATH = process.env.UPLOADS_USER_PATH as string
const USER_MAX_SIZE = Number(process.env.USER_MAX_SIZE)

export default function userAvatarUpload(req: Request, res: Response, next: NextFunction) {
  const storage = multer.diskStorage({
    destination: path.join('public', UPLOADS_USER_PATH)
  })

  multer({
    storage,
    limits: {
      files: 1,
      fileSize: USER_MAX_SIZE
    }
  }).single('avatar')(req, res, err => {
    if (err) {
      return res.status(500).json(err)
    }
    return next()
  })
}