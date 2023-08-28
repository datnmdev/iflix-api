import {Schema, Model} from 'mongoose'

import IHistory from '../../interfaces/entities/IHistory'

const historySchema = new Schema<IHistory, Model<IHistory>>({
  episode: {
    type: Schema.Types.ObjectId,
    ref: 'episode'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
})

export default historySchema