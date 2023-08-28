import {model} from 'mongoose'

import genreSchema from './schema'
import IGenre from '../../interfaces/entities/IGenre'

const Genre = model<IGenre>('genre', genreSchema)

export default Genre