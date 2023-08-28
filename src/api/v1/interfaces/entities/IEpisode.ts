import {Types} from 'mongoose'

interface IEpisode {
    name: string,
    movie: Types.ObjectId
}

export default IEpisode