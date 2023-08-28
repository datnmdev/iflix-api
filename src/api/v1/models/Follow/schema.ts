import {Schema, Model} from 'mongoose'

import IFollow from '../../interfaces/entities/IFollow'

const followSchema = new Schema<IFollow, Model<IFollow>>({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'movie'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
})

export default followSchema