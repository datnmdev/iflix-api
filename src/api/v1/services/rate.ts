import { ClientSession, Types } from 'mongoose'

import Rate from '../models/Rate'

const rateService = {
  findByUserIdAndDelete(userId: Types.ObjectId, session: ClientSession | null = null) {
    return Rate.deleteMany({ user: userId }, { session })
  },
  findByMovieIdAndDelete(movieId: Types.ObjectId, session: ClientSession | null = null) {
    return Rate.deleteMany({ movie: movieId }, { session })
  } 
}

export default rateService