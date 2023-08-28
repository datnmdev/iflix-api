import { Request, Response } from 'express'

import User from '../../models/User'

const getAll = async (req: Request, res: Response) => {
  const users = await User.find({ role: 'user' })

  return res.status(200).json([ ...users ])
}

export default getAll