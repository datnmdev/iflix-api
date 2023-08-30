import { ClientSession, Types } from 'mongoose'

import IGenre from '../interfaces/entities/IGenre'
import Genre from '../models/Genre'

const genreService = {
  findAll() {
    return Genre.find()
  },
  create(genre: IGenre) {
    const genreDoc = new Genre(genre)
    return genreDoc.save()
  },
  findByIdAndUpdate(id: Types.ObjectId, infoWillByApplied: IGenre) {
    return Genre.findByIdAndUpdate(id, infoWillByApplied)
  },
  findByIdAndDelete(id: Types.ObjectId, session: ClientSession | null = null) {
    return Genre.findOneAndDelete({ _id: id }, { session })
  }
}

export default genreService