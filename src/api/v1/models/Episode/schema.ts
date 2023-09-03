import {Schema, Model} from 'mongoose'

import IEpisode from '../../interfaces/entities/IEpisode'
import historyService from '../../services/history'
import commentService from '../../services/comment'

const episodeSchema = new Schema<IEpisode, Model<IEpisode>>({
  ordinalNumber: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    required: true
  },
  commentCount: {
    type: Number,
    default: 0,
    required: true
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'movie'
  }
})

// Middlewates
episodeSchema.pre('deleteMany', { document: false, query: true }, async function (next) {
  try {
    await historyService.findByEpisodeIdAndDelete(this.getFilter()._id, this.getOptions().session)
    await commentService.findByEpisodeIdAndDelete(this.getFilter()._id, this.getOptions().session)
  } catch (error: any) {
    return next(error)
  }
}) 

export default episodeSchema