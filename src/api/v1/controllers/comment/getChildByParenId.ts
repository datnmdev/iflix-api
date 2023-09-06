import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import commentService from '../../services/comment'

const getChildByParentId = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.parentId || !req.query.page) {
    return next()
  }

  try {
    const comments = await commentService.findChildByParentId(new Types.ObjectId(String(req.query.parentId)), Number(req.query.page))

    return res.status(200).json(comments)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getChildByParentId