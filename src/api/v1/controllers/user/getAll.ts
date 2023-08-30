import { Request, Response } from 'express'

import userSevice from '../../services/user'

const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userSevice.findByRole('user')
  
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'An internal error occurred while processing the request'
    })
  }
}

export default getAll