import Schedule from '../models/Schedule'

const scheduleService = {
  findAll() {
    return Schedule.find()
  }
}

export default scheduleService