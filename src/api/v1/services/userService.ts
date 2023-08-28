import { Types, mongo } from 'mongoose'

import User from '../models/User'
import IUser from '../interfaces/entities/IUser'

const userSevice = {
  findById(id: Types.ObjectId): Promise<IUser | null> {
    return User.findOne({ _id: id })
  },
  findByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username: username })
  },
  createUser(user: IUser, session: mongo.ClientSession | null = null) {
    const userDoc = new User(user)
    return userDoc.save({ session })
  }
}

export default userSevice