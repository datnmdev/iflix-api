import {Schema, Model} from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

import ICast from '../../interfaces/entities/ICast'
import movieService from '../../services/movie'

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

// Middlewares
castSchema.pre('findOneAndDelete', { document: false, query: true }, async function(next) {
  try {
    await movieService.findAndDeleteCast(this.getFilter()._id, this.getOptions().session)
  } catch (error: any) {
    next(error)
  }
})

export default castSchema