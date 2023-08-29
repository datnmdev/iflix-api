import {Schema, Model} from 'mongoose'

import IRate from '../../interfaces/entities/IRate'

const rateSchema = new Schema<IRate, Model<IRate>>({
  stars: {
    type: Number,
    min: 1,
    max: 5
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'movie'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

export default rateSchema