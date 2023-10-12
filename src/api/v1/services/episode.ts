import { ClientSession, Types, UpdateQuery } from 'mongoose'

import Episode from '../models/Episode'
import IEpisode from '../interfaces/entities/IEpisode'

const episodeService = {
  findAll() {
    return Episode.find()
  },
  findByMovieId(movieId: Types.ObjectId) {
    return Episode.find({ movie: movieId })
  },
  findById(id: Types.ObjectId) {
    return Episode.findById(id)
  },
  create(episode: IEpisode, session: ClientSession | null = null) {
    const episodeDoc = new Episode(episode)
    return episodeDoc.save({ session })
  },
  updateById(id: Types.ObjectId, infoWillBeApplied: UpdateQuery<IEpisode> | undefined, session: ClientSession | null = null) {
    return Episode.findByIdAndUpdate(id, infoWillBeApplied, { session })
  },
  findByIdAndDelete(id: Types.ObjectId, session: ClientSession | null = null) {
    return Episode.findOneAndDelete({ _id: id }, { session })
  },
  findByIdAndUpdate(id: Types.ObjectId, infoWillBeApplied: UpdateQuery<IEpisode> | undefined, session: ClientSession | null = null) {
    return Episode.findByIdAndUpdate(id, infoWillBeApplied, { session })
  },
  findByMovieIdAndDelete(movieId: Types.ObjectId, session: ClientSession | null = null) {
    return Episode.deleteMany({ movie: movieId }, { session })
  }
}

export default episodeService