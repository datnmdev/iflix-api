import {model} from 'mongoose'

import episodeSchema from './schema'
import IEpisode from '../../interfaces/entities/IEpisode'

const Episode = model<IEpisode>('episode', episodeSchema)

export default Episode