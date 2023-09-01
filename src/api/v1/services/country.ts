import { ClientSession, Types } from 'mongoose'

import Country from '../models/Country'
import ICountry from '../interfaces/entities/ICountry'

const countryService = {
  findAll() {
    return Country.find()
  },
  findById(id: Types.ObjectId) {
    return Country.findById(id)
  },
  create(country: ICountry) {
    const countryDoc = new Country(country)
    return countryDoc.save()
  },
  findByIdAndUpdate(id: Types.ObjectId, infoWillByApplied: ICountry) {
    return Country.findByIdAndUpdate(id, infoWillByApplied)
  },
  findByIdAndDelete(id: Types.ObjectId, session: ClientSession | null = null) {
    return Country.findOneAndDelete({ _id: id }, { session })
  }
}

export default countryService