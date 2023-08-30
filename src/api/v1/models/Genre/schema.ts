import {Schema, Model} from 'mongoose'

import IGenre from '../../interfaces/entities/IGenre'
import movieService from '../../services/movie'

const genreSchema = new Schema<IGenre, Model<IGenre>>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
})

// Middlewares
genreSchema.pre('findOneAndDelete', { document: false, query: true }, async function(next) {
  try {
    await movieService.findAndDeleteGenre(this.getFilter()._id, this.getOptions().session)
  } catch (error: any) {
    next(error)
  }
})

export default genreSchema