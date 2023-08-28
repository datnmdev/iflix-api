import {Schema, Model} from 'mongoose'

import IPasswordCredential from '../../interfaces/entities/IPasswordCredential'

const passwordCredentialSchema = new Schema<IPasswordCredential, Model<IPasswordCredential>>({
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId
  }
}) 

export default passwordCredentialSchema