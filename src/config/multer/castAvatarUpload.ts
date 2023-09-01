import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const UPLOADS_CAST_PATH = process.env.UPLOADS_CAST_PATH as string
const CAST_MAX_SIZE = Number(process.env.CAST_MAX_SIZE)

const storage = multer.diskStorage({
  destination: path.join('public', UPLOADS_CAST_PATH),
  filename(req, file, callback) {
    callback(null, req.params.id + '.' + file.mimetype.split('/')[1])
  },
})

const castAvatarUpload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: CAST_MAX_SIZE,
    fields: 1
  }
})

export default castAvatarUpload