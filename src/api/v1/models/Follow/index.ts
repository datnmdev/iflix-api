import {model} from 'mongoose'

import followSchema from './schema'
import IFollow from '../../interfaces/entities/IFollow'

const Follow = model<IFollow>('follow', followSchema)

export default Follow