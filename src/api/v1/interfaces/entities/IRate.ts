import {Types} from 'mongoose'

interface IRate {
    stars: number,
    user: Types.ObjectId
}

export default IRate