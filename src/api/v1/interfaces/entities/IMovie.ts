import {Types} from 'mongoose'

import IRate from './IRate'

interface IMovie {
    title: string,
    alias: Types.Array<string>,
    description?: string,
    posterUrl: string,
    release: number,
    duration: string,
    episodeCount?: number
    genres: Types.Array<Types.ObjectId>,
    directors: Types.Array<Types.ObjectId>,
    casts: Types.Array<Types.ObjectId>,
    country: Types.ObjectId
}

export default IMovie