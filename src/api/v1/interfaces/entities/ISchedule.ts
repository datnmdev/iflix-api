import { Types } from 'mongoose'
import WeekDay from '../../enums/WeekDay'
import ScheduleStatus from '../../enums/ScheduleStatus'

interface ISchedule {
  movie: Types.ObjectId,
  schedules: Types.Array<WeekDay.MONDAY | WeekDay.TUESDAY | WeekDay.WEDNESDAY | WeekDay.THURSDAY | WeekDay.FRIDAY | WeekDay.SATURDAY | WeekDay.SUNDAY>,
  content: string,
  status: ScheduleStatus.UNRELEASED | ScheduleStatus.RELEASED | ScheduleStatus.DELAY
}

export default ISchedule