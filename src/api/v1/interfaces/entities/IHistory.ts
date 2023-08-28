import {Types} from 'mongoose'

interface IHistory {
    episode: Types.ObjectId,
    user: Types.ObjectId
}

export default IHistory