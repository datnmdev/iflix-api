import { NextFunction, Request, Response } from 'express'

import historyService from '../../services/history'

const getByUserIdAndDate = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.date) {
    return next()
  }

  try {
    const histories = await historyService.findByUserIdAndDate(new Date(req.query.date as string))

    return res.status(200).json(histories)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getByUserIdAndDate