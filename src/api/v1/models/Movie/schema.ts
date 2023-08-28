import {Schema} from 'mongoose'

import rateSchema from '../Rate/schema'
import movieModelType from './modelType'
import IMovie from '../../interfaces/entities/IMovie'

const movieSchema = new Schema<IMovie, movieModelType>({
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
  },
  rate: [rateSchema]
})

export default movieSchema
  