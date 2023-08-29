import {model} from 'mongoose'

import movieSchema from './schema'
import IMovie from '../../interfaces/entities/IMovie'

const Movie = model<IMovie>('movie', movieSchema)

export default Movie