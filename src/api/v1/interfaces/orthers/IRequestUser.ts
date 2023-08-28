import { Types } from 'mongoose'

interface IRequestUser {
  id: Types.ObjectId,
  role: string
}

export default IRequestUser