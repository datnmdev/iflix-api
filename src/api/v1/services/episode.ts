import { ClientSession, Types } from 'mongoose'

import Episode from '../models/Episode'

const episodeService = {
  findByIdAndUpdate(id: Types.ObjectId, infoWillBeApplied: any, session: ClientSession | null = null) {
    return Episode.findByIdAndUpdate(id, infoWillBeApplied, { session })
  },
  findByMovieIdAndDelete(movieId: Types.ObjectId, session: ClientSession | null = null) {
    return Episode.deleteMany({ movie: movieId }, { session })
  }
}

export default episodeService