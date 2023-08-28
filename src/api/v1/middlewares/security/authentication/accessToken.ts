import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('accessTokenJwt', { session: false })(req, res, next)
}

export default authenticateAccessToken