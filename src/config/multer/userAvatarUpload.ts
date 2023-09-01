import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const UPLOADS_USER_PATH = process.env.UPLOADS_USER_PATH as string
const USER_MAX_SIZE= Number(process.env.USER_MAX_SIZE)

const storage = multer.diskStorage({
  destination: path.join('public', UPLOADS_USER_PATH),
  filename(req, file, callback) {
    callback(null, req.params.id + '.' + file.mimetype.split('/')[1])
  },
})

const userAvatarUpload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: USER_MAX_SIZE,
    fields: 1
  }
})

export default userAvatarUpload