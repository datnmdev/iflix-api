import { Types, ClientSession, ProjectionType } from 'mongoose'

import User from '../models/User'
import IUser from '../interfaces/entities/IUser'

const userSevice = {
  findById(id: Types.ObjectId) {
    return User.findOne({ _id: id })
  },
  findByUsername(username: string) {
    return User.findOne({ username: username })
  },
  findByRole(role: string, projection?: ProjectionType<IUser>) {
    if (projection === undefined) {
      return User.find({ role })
    }
    
    return User.find({ role }, projection)
  },
  createUser(user: IUser, session: ClientSession | null = null) {
    const userDoc = new User(user)
    return userDoc.save({ session })
  },
  findByIdAndUpdate(id: Types.ObjectId, infoWillBeApplied: any) {
    return User.findByIdAndUpdate(id, infoWillBeApplied)
  },
  findByIdAndDelete(id: Types.ObjectId, session: ClientSession | null = null) {
    return User.findOneAndDelete({ _id: id }, { session })
  }
}

export default userSevice