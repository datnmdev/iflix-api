import {Schema, Model} from 'mongoose'

import ICountry from '../../interfaces/entities/ICountry'

const countrySchema = new Schema<ICountry, Model<ICountry>>({
  name: {
    type: String,
    required: true
  }
})

export default countrySchema