import {Schema, Model} from 'mongoose'

import IUser from '../../interfaces/entities/IUser'

const userSchema = new Schema<IUser, Model<IUser>>({
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  provider: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
})

export default userSchema