import {model} from 'mongoose'

import commentSchema from './schema'
import IComment from '../../interfaces/entities/IComment'

const Comment = model<IComment>('comment', commentSchema)

export default Comment