import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import commentService from '../../services/comment'
import IRequestUser from '../../interfaces/orthers/IRequestUser'

const like = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.action || req.query.action !== 'like') {
    return next()
  }

  try {
    const comment = await commentService.findById(new Types.ObjectId(req.params.id))
    const likeIndex = comment!.likes!.findIndex(userId => userId.toString() === (req.user as IRequestUser).id.toString())
    const dislikeIndex = comment!.dislikes!.findIndex(userId => userId.toString() === (req.user as IRequestUser).id.toString())

    if (dislikeIndex != -1) {
      comment!.dislikes!.splice(dislikeIndex, 1)
      comment!.likes!.push((req.user as IRequestUser).id)
    } else {
      if (likeIndex == -1) {
        comment!.likes!.push((req.user as IRequestUser).id)
      } else {
        comment!.likes!.splice(likeIndex, 1)
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

export default like