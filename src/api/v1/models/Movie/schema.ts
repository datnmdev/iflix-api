import { Schema, Model } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

import IMovie from '../../interfaces/entities/IMovie'
import followService from '../../services/follow'
import rateService from '../../services/rate'
import episodeService from '../../services/episode'

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
    default: [],
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
  views: {
    type: Number,
    default: 0
  },
  episode: {
    total: {
      type: Number,
      default: 0
    },
    numberOfEpisodesReleased: {
      type: Number,
      default: 0
    }
  },
  followerCount: {
    type: Number,
    default: 0,
    required: true
  },
  ratingSummary: {
    starRatingCount: {
      type: Number,
      default: 0
    },
    reviewCount: {
      type: Number,
      default: 0
    }
  },
  genres: {
    type: [{type: Schema.Types.ObjectId, ref: 'genre'}],
    default: [],
    required: true
  },
  directors: {
    type: [{type: Schema.Types.ObjectId, ref: 'director'}],
    default: [],
    required: true
  },
  casts: {
    type: [{type: Schema.Types.ObjectId, ref: 'cast'}],
    default: [],
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'country'
  }
})

// Middlewares
movieSchema.pre('findOneAndDelete', { document: false, query: true }, async function(next) {
  try {
    await followService.findByMovieIdAndDelete(this.getFilter()._id, this.getOptions().session)
    await rateService.findByMovieIdAndDelete(this.getFilter()._id, this.getOptions().session)
    await episodeService.findByMovieIdAndDelete(this.getFilter()._id, this.getOptions().session)
  } catch (error: any) {
    return next(error)
  }
})

export default movieSchema
  