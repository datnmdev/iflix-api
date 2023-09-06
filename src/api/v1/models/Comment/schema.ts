import {Schema, Model} from 'mongoose'

import IComment from '../../interfaces/entities/IComment'

const commentSchema = new Schema<IComment, Model<IComment>>({
  pin: {
    type: Boolean,
    default: false,
    require: true
  },
  text: {
    type: String,
    required: true
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'user'
      }
    ],
    default: []
  },
  dislikes: {
    type: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'user'
      }
    ],
    default: []
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  episode: {
    type: Schema.Types.ObjectId,
    ref: 'episode'
  },
  parent: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'comment'
  },
  replies: {
    type: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'comment'
      }
    ],
    default: []
  }
}, {
  timestamps: true
})

export default commentSchema