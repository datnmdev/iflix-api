import {Types} from 'mongoose'

interface IComment {
    pin?: boolean | false,
    text: string,
    likes?: Types.Array<Types.ObjectId>,
    dislikes?: Types.Array<Types.ObjectId>,
    author: Types.ObjectId,
    episode: Types.ObjectId,
    parent?: Types.ObjectId | undefined,
    replies?: Types.Array<Types.ObjectId>
}

export default IComment
