import {model} from 'mongoose'

import countrySchema from './schema'
import ICountry from '../../interfaces/entities/ICountry'

const Country = model<ICountry>('country', countrySchema)

export default Country