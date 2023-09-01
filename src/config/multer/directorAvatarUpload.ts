import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const UPLOADS_DIRECTOR_PATH = process.env.UPLOADS_DIRECTOR_PATH as string
const DIRECTOR_MAX_SIZE = Number(process.env.DIRECTOR_MAX_SIZE)

const storage = multer.diskStorage({
  destination: path.join('public', UPLOADS_DIRECTOR_PATH),
  filename(req, file, callback) {
    callback(null, req.params.id + '.' + file.mimetype.split('/')[1])
  },
})

const directorAvatarUpload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: DIRECTOR_MAX_SIZE,
    fields: 1
  }
})

export default directorAvatarUpload