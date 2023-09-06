import { Request, Response } from 'express'
import { Types, UpdateQuery } from 'mongoose'

import IComment from '../../interfaces/entities/IComment'
import commentService from '../../services/comment'

const updateById = async (req: Request, res: Response) => {
  try {
    const commentData: UpdateQuery<IComment> = {
      text: req.body.text
    }

    await commentService.updateById(new Types.ObjectId(req.params.id), commentData)

    return res.status(200).json({
      status: 'OK',
      message: 'The comment has been updated successfully'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default updateById