import {model} from 'mongoose'

import rateSchema from './schema'
import IRate from '../../interfaces/entities/IRate'

const Rate = model<IRate>('rate', rateSchema)

export default Rate