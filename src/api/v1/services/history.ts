import { ClientSession, Types } from 'mongoose'

import History from '../models/History'

const historyService = {
  findByUserIdAndDelete(userId: Types.ObjectId, session: ClientSession | null = null) {
    return History.deleteMany({ user: userId }, { session })
  },
  findByEpisodeIdAndDelete(episodeId: Types.ObjectId, session: ClientSession | null = null) {
    return History.deleteMany({ episode: episodeId }, { session })
  }
}

export default historyService