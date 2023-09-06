import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import commentService from '../../services/comment'
import IRequestUser from '../../interfaces/orthers/IRequestUser'

const dislike = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.action || req.query.action !== 'dislike') {
    return next()
  }

  try {
    const comment = await commentService.findById(new Types.ObjectId(req.params.id))
    const dislikeIndex = comment!.dislikes!.findIndex(userId => userId.toString() === (req.user as IRequestUser).id.toString())
    const likeIndex = comment!.likes!.findIndex(userId => userId.toString() === (req.user as IRequestUser).id.toString())

    if (likeIndex != -1) {
      comment!.likes!.splice(likeIndex, 1)
      comment!.dislikes!.push((req.user as IRequestUser).id)
    } else {
      if (dislikeIndex == -1) {
        comment!.dislikes!.push((req.user as IRequestUser).id)
      } else {
        comment!.dislikes!.splice(dislikeIndex, 1)
      }
    }

    await comment!.save()

    return res.status(200).json({
      status: 'OK'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default dislike