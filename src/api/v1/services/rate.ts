import { ClientSession, Types } from 'mongoose'

import Rate from '../models/Rate'
import IRate from '../interfaces/entities/IRate'

const rateService = {
  findAll() {
    return Rate.find()
  },
  create(rate: IRate, session: ClientSession | null = null) {
    const rateDoc = new Rate(rate)
    return rateDoc.save({ session })
  },
  findByMovieIdAndUserId(movieId: Types.ObjectId, userId: Types.ObjectId) {
    return Rate.findOne({ movie: movieId, user: userId })
  },
  findByUserIdAndDelete(userId: Types.ObjectId, session: ClientSession | null = null) {
    return Rate.deleteMany({ user: userId }, { session })
  },
  findByMovieIdAndDelete(movieId: Types.ObjectId, session: ClientSession | null = null) {
    return Rate.deleteMany({ movie: movieId }, { session })
  } 
}

export default rateService