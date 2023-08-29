import { ClientSession, Types } from 'mongoose'

import History from '../models/History'

const historyService = {
  findByUserIdAndDelete(userId: Types.ObjectId, session: ClientSession | null = null) {
    return History.deleteMany({ user: userId }, { session })
  }
}

export default historyService