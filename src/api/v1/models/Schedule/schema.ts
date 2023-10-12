import { Schema, Model } from 'mongoose'

import ISchedule from '../../interfaces/entities/ISchedule'
import ScheduleStatus from '../../enums/ScheduleStatus'

const scheduleSchema = new Schema<ISchedule, Model<ISchedule>>({
  movie: {
    type: Schema.ObjectId,
    required: true,
    ref: 'movie'
  },
  schedules: {
    type: [Number],
    default: []
  },
  content: {
    type: String,
    default: ''
  },
  status: {
    type: Number,
    default: ScheduleStatus.UNRELEASED
  }
})

export default scheduleSchema