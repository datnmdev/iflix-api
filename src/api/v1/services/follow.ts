import { ClientSession, Types } from 'mongoose'

import Follow from '../models/Follow'

const followService = {
  findByUserIdAndDelete(userId: Types.ObjectId, session: ClientSession | null = null) {
    return Follow.deleteMany({ user: userId }, { session })
  }
}

export default followService