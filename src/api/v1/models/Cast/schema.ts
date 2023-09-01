import {Schema, Model} from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

import ICast from '../../interfaces/entities/ICast'

dotenv.config()

const UPLOADS_CAST_PATH = process.env.UPLOADS_CAST_PATH as string
const CAST_AVATAR_DEFAULT = process.env.CAST_AVATAR_DEFAULT as string

const castSchema = new Schema<ICast, Model<ICast>>({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: path.join(UPLOADS_CAST_PATH, CAST_AVATAR_DEFAULT),
    required: true
  }
})

export default castSchema