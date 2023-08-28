import {Schema, Model} from 'mongoose'

import IEpisode from '../../interfaces/entities/IEpisode'

const episodeSchema = new Schema<IEpisode, Model<IEpisode>>({
  name: {
    type: String,
    required: true
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'movie'
  }
})

export default episodeSchema