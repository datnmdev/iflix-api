import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

const authenticateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('refreshTokenJwt', { session: false })(req, res, next)
}

export default authenticateRefreshToken