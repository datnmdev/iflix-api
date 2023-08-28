import {model} from 'mongoose'

import userSchema from './schema'
import IUser from '../../interfaces/entities/IUser'
import './virtuals'

const User = model<IUser>('user', userSchema)

export default User