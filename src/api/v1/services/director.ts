import { ClientSession, Types } from 'mongoose'

import Director from '../models/Director'
import IDirector from '../interfaces/entities/IDirector'

const directorService = {
  findAll() {
    return Director.find()
  },
  findById(id: Types.ObjectId) {
    return Director.findById(id)
  },
  create(director: IDirector) {
    const directorDoc = new Director(director)
    return directorDoc.save()
  },
  findByIdAndUpdate(id: Types.ObjectId, infoWillByApplied: IDirector) {
    return Director.findByIdAndUpdate(id, infoWillByApplied)
  },
  findByIdAndDelete(id: Types.ObjectId, session: ClientSession | null = null) {
    return Director.findOneAndDelete({ _id: id }, { session })
  }
}

export default directorService