import { ClientSession, Types } from 'mongoose'

import History from '../models/History'
import IHistory from '../interfaces/entities/IHistory'
import dateTimeUtils from '../utils/datetime'

const historyService = {
  findByUserIdAndDate(date: Date) {
    return History.aggregate([
      {
        $match: {
          createdAt: {
            $gte: dateTimeUtils.startOfDay(date),
            $lt: dateTimeUtils.endOfDay(date)
          }
        }
      },
      {
        $group: {
          _id: {
            episode: '$episode',
            user: '$user'
          },
          createdAt: { $max: '$createdAt' }
        }
      },
      {
        $project: {
          _id: 0,
          episode: '$_id.episode',
          user: '$_id.user',
          createdAt: '$createdAt'
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      }
    ])
  },
  create(history: IHistory) {
    const historyDoc = new History(history)
    return historyDoc.save()
  },
  findByUserIdAndDelete(userId: Types.ObjectId, session: ClientSession | null = null) {
    return History.deleteMany({ user: userId }, { session })
  },
  findByEpisodeIdAndDelete(episodeId: Types.ObjectId, session: ClientSession | null = null) {
    return History.deleteMany({ episode: episodeId }, { session })
  }
}

export default historyService