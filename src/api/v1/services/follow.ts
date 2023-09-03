import { ClientSession, FilterQuery, Types } from 'mongoose'

import Follow from '../models/Follow'
import IFollow from '../interfaces/entities/IFollow'

const followService = {
  create(follow: IFollow, session: ClientSession | null = null) {
    const followDoc = new Follow(follow)
    return followDoc.save({ session })
  },
  deleteOne(filter: FilterQuery<IFollow> | undefined, session: ClientSession | null = null) {
    return Follow.deleteOne(filter, { session })
  },
  findByUserId(userId: Types.ObjectId) {
    return Follow.find({ user: userId }).populate('movie')
  },
  findByMovieIdAndUserId(movieId: Types.ObjectId, userId: Types.ObjectId) {
    return Follow.findOne({ movie: movieId, user: userId })
  },
  findByUserIdAndDelete(userId: Types.ObjectId, session: ClientSession | null = null) {
    return Follow.deleteMany({ user: userId }, { session })
  },
  findByMovieIdAndDelete(movieId: Types.ObjectId, session: ClientSession | null = null) {
    return Follow.deleteMany({ movie: movieId }, { session })
  }
}

export default followService