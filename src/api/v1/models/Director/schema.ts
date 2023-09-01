import {Schema, Model} from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

import IDirector from '../../interfaces/entities/IDirector'
import movieService from '../../services/movie'

dotenv.config()

const UPLOADS_DIRECTOR_PATH = process.env.UPLOADS_DIRECTOR_PATH as string
const DIRECTOR_AVATAR_DEFAULT = process.env.DIRECTOR_AVATAR_DEFAULT as string

const directorSchema = new Schema<IDirector, Model<IDirector>>({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: path.join(UPLOADS_DIRECTOR_PATH, DIRECTOR_AVATAR_DEFAULT),
    required: true
  }
})

// Middlewares
directorSchema.pre('findOneAndDelete', { document: false, query: true }, async function(next) {
  try {
    await movieService.findAndDeleteDirector(this.getFilter()._id, this.getOptions().session)
  } catch (error: any) {
    next(error)
  }
})

export default directorSchema