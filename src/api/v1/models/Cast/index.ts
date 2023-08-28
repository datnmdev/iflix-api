import {model} from 'mongoose'

import ICast from '../../interfaces/entities/ICast'
import castSchema from './schema'

const Cast = model<ICast>('cast', castSchema)

export default Cast