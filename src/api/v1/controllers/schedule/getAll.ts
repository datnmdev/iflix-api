import { NextFunction, Request, Response } from 'express'

import scheduleService from '../../services/schedule'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schedules = await scheduleService.findAll()

    return res.status(200).json(schedules)
  } catch (err) {
    return next(err)
  }
}

export default getAll