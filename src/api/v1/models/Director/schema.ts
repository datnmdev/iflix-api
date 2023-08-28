import {Schema, Model} from 'mongoose'

import IDirector from '../../interfaces/entities/IDirector'

const directorSchema = new Schema<IDirector, Model<IDirector>>({
  name: {
    type: String,
    required: true
  }
})

export default directorSchema