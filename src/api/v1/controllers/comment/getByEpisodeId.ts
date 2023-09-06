import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import commentService from '../../services/comment'

const getByEpisodeId = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.episodeId || !req.query.page) {
    return next()
  }

  try {
    const comments = await commentService.findByEpisodeId(new Types.ObjectId(String(req.query.episodeId)), Number(req.query.page))

    return res.status(200).json(comments)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getByEpisodeId