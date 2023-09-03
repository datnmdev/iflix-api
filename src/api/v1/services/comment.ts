import { ClientSession, Types } from 'mongoose'

import Comment from '../models/Comment'

const commentService = {
  findByUserIdAndDelete(userId: Types.ObjectId, session: ClientSession | null = null) {
    return Comment.deleteMany({ user: userId }, { session })
  },
  findByEpisodeIdAndDelete(episodeId: Types.ObjectId, session: ClientSession | null = null) {
    return Comment.deleteMany({ episode: episodeId }, { session })
  }
}

export default commentService