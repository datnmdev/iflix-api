import { Types } from 'mongoose'

interface IUser {
  _id?: Types.ObjectId,
  username?: string,
  email?: string,
  name: {
    first: string,
    last: string
  },
  provider?: string,
  role: string
}

export default IUser