import {model} from 'mongoose'

import historySchema from './schema'
import IHistory from '../../interfaces/entities/IHistory'

const History = model<IHistory>('history', historySchema)

export default History