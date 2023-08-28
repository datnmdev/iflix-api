import {model} from 'mongoose'

import directorSchema from './schema'
import IDirector from '../../interfaces/entities/IDirector'

const Director = model<IDirector>('director', directorSchema)

export default Director