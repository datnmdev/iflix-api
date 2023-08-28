import {Schema, Model} from 'mongoose'

import IFacebookCredential from '../../interfaces/entities/IFacebookCredential'

const facebookCredentialSchema = new Schema<IFacebookCredential, Model<IFacebookCredential>>({
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

export default facebookCredentialSchema