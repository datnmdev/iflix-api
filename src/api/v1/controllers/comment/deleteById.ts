import { Request, Response } from 'express'
import mongoose, { Types } from 'mongoose'

import commentService from '../../services/comment'
import episodeService from '../../services/episode'


const deleteById = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const comment = await commentService.findById(new Types.ObjectId(req.params.id))

    if (comment?.parent) {
      const parentComment = await commentService.findById(comment.parent)
      const index = parentComment!.replies!.findIndex(reply => reply.toString() === comment._id.toString())
      
      parentComment!.replies!.splice(index, 1)
      parentComment!.save({ session })
    }

    const descendantIds = (await commentService.findChildByParentId(comment!._id)).map(comment => comment._id)
    const deleteManyByIds = await commentService.deleteManyByIds(descendantIds as Types.Array<Types.ObjectId | never>)
    
    await commentService.deleteById(new Types.ObjectId(req.params.id), session)
    await episodeService.findByIdAndUpdate(comment!.episode, { $inc: { commentCount: -(deleteManyByIds.deletedCount + 1) } }, session)

    await session.commitTransaction()
    await session.endSession()

    return res.status(200).json({
      status: 'OK',
      message: 'The comment has been deleted successfully'
    })
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default deleteById