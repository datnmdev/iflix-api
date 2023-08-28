import {Schema, Model} from 'mongoose'

import ICast from '../../interfaces/entities/ICast'

const castSchema = new Schema<ICast, Model<ICast>>({
  name: {
    type: String,
    required: true
  }
})

export default castSchema