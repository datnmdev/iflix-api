import {model} from 'mongoose'

import ISchedule from '../../interfaces/entities/ISchedule'
import scheduleSchema from './schema'

const Schedule = model<ISchedule>('schedules', scheduleSchema)

export default Schedule