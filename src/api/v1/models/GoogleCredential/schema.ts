import {Schema, Model} from 'mongoose'

import IGoogleCredential from '../../interfaces/entities/IGoogleCredential'

const googleCredentialSchema = new Schema<IGoogleCredential, Model<IGoogleCredential>>({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

export default googleCredentialSchema