import {model} from 'mongoose'

import movieSchema from './schema'
import movieModelType from './modelType'
import IMovie from '../../interfaces/entities/IMovie'

const Movie = model<IMovie, movieModelType>('movie', movieSchema)

export default Movie