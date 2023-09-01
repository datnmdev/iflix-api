import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const UPLOADS_POSTER_PATH = process.env.UPLOADS_POSTER_PATH as string
const POSTER_MAX_SIZE = Number(process.env.POSTER_MAX_SIZE)

const storage = multer.diskStorage({
  destination: path.join('public', UPLOADS_POSTER_PATH),
  filename(req, file, callback) {
    callback(null, req.params.id + '.' + file.mimetype.split('/')[1])
  },
})

const posterUpload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: POSTER_MAX_SIZE,
    fields: 1
  }
})

export default posterUpload