import {Types} from 'mongoose'

interface IRate {
    stars: number,
    movie: Types.ObjectId,
    user: Types.ObjectId
}

export default IRate