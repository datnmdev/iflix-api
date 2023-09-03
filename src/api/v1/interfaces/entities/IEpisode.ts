import {Types} from 'mongoose'

interface IEpisode {
    ordinalNumber: number,
    name: string,
    commentCount: number,
    movie: Types.ObjectId
}

export default IEpisode