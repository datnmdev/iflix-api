import {model} from 'mongoose'

import IEvaluation from '../../interfaces/entities/IEvaluation'
import evaluationSchema from './schema'

const Evaluation = model<IEvaluation>('evaluation', evaluationSchema)

export default Evaluation