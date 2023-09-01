import { ClientSession, Types } from 'mongoose'

import Cast from '../models/Cast'
import ICast from '../interfaces/entities/ICast'

const castService = {
  findAll() {
    return Cast.find()
  },
  findById(id: Types.ObjectId) {
    return Cast.findById(id)
  },
  create(cast: ICast) {
    const castDoc = new Cast(cast)
    return castDoc.save()
  },
  findByIdAndUpdate(id: Types.ObjectId, infoWillByApplied: ICast) {
    return Cast.findByIdAndUpdate(id, infoWillByApplied)
  },
  findByIdAndDelete(id: Types.ObjectId, session: ClientSession | null = null) {
    return Cast.findOneAndDelete({ _id: id }, { session })
  }
}

export default castService