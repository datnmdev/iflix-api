import { Schema, Model } from 'mongoose'

import IMovie from '../../interfaces/entities/IMovie'

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
  