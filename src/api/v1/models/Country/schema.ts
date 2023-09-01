import {Schema, Model} from 'mongoose'

import ICountry from '../../interfaces/entities/ICountry'
import movieService from '../../services/movie'

const countrySchema = new Schema<ICountry, Model<ICountry>>({
  name: {
    type: String,
    required: true
  }
})

// Middlewares
countrySchema.pre('findOneAndDelete', { document: false, query: true }, async function(next) {
  try {
    await movieService.findAndDeleteCountry(this.getFilter()._id, this.getOptions().session)
  } catch (error: any) {
    next(error)
  }
})

export default countrySchema