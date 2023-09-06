import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'

import IComment from '../../interfaces/entities/IComment'
import IRequestUser from '../../interfaces/orthers/IRequestUser'
import commentService from '../../services/comment'
import episodeService from '../../services/episode'

const create = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const commentData: IComment = {
      text: req.body.text,
      episode: new Types.ObjectId(req.body.episode),
      author: (req.user as IRequestUser).id,
      parent: req.body.parent ? new Types.ObjectId(req.body.parent) : undefined
    }

    const comment = await commentService.create(commentData, session)

    if (commentData.parent) {
      const parentComment = await commentService.findById(commentData.parent)
      parentComment!.replies!.push(comment._id)
      await parentComment!.save({ session })
    }

    await episodeService.findByIdAndUpdate(commentData.episode, { $inc: { commentCount: 1 } }, session)

    await session.commitTransaction()
    await session.endSession()

    return res.status(201).json({
      status: 'Created'
    })
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default create