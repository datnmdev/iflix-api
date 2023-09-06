import { NextFunction, Request, Response } from 'express'

import defineAbilityAboutCommentFor from './rules'

const getByMovieId = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.movieId || !req.query.page) {
    return next()
  }
  
  if (defineAbilityAboutCommentFor().can('read', 'Comment')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default getByMovieId