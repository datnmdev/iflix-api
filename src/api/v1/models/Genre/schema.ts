import {Schema, Model} from 'mongoose'

import IGenre from '../../interfaces/entities/IGenre'

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

export default genreSchema