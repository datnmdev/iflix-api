import { NextFunction, Request, Response } from 'express'
import { subject } from '@casl/ability'
import { Types } from 'mongoose'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import defineAbilityAboutCommentFor from './rules'
import commentService from '../../../../services/comment'

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  const comment = await commentService.findById(new Types.ObjectId(req.params.id))

  if (defineAbilityAboutCommentFor(req.user as IRequestUser).can('update', subject('Comment', { author: comment!.author }))) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default updateById