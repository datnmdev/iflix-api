import { ClientSession, Types } from 'mongoose'

import Comment from '../models/Comment'

const commentService = {
  findByUserIdAndDelete(userId: Types.ObjectId, session: ClientSession | null = null) {
    return Comment.deleteMany({ user: userId }, { session })
  }
}

export default commentService