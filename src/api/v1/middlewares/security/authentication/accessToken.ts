import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated().valueOf()) {
    return next()
  }

  passport.authenticate('accessTokenJwt', { session: false })(req, res, next)
}

export default authenticateAccessToken