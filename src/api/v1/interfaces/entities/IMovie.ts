import {Types} from 'mongoose'

interface IMovie {
    title: string,
    alias: Types.Array<string> | never[],
    description?: string,
    posterUrl?: string,
    release: number,
    duration: {
      value: number,
      meaning: string
    },
    views?: number,
    episode?: {
      total: number,
      numberOfEpisodesReleased: number
    },
    followerCount?: number,
    ratingSummary?: {
      starRatingCount: number,
      reviewCount: number
    },
    genres: Types.Array<Types.ObjectId> | never[],
    directors: Types.Array<Types.ObjectId> | never[],
    casts: Types.Array<Types.ObjectId> | never[],
    country?: Types.ObjectId
}

export default IMovie