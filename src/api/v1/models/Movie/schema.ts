import { Schema, Model } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

import IMovie from '../../interfaces/entities/IMovie'

dotenv.config()

const UPLOADS_POSTER_PATH = process.env.UPLOADS_POSTER_PATH as string
const POSTER_DEFAULT = process.env.POSTER_DEFAULT as string

const movieSchema = new Schema<IMovie, Model<IMovie>>({
  title: {
    type: String,
    required: true
  },
  alias: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: false
  },
  posterUrl: {
    type: String,
    default: path.join(UPLOADS_POSTER_PATH, POSTER_DEFAULT),
    required: true
  },
  release: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  episodeCount: {
    type: Number,
    required: false
  },
  genres: {
    type: [{type: Schema.Types.ObjectId, ref: 'genre'}],
    required: true
  },
  directors: {
    type: [{type: Schema.Types.ObjectId, ref: 'director'}],
    required: true
  },
  casts: {
    type: [{type: Schema.Types.ObjectId, ref: 'cast'}],
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'country'
  }
})

export default movieSchema
  