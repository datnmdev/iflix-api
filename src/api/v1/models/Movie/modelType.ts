import {Model, Types} from 'mongoose'

import IRate from '../../interfaces/entities/IRate'
import IMovie from '../../interfaces/entities/IMovie'

type movieDocumentProps = {
  feedback: Types.DocumentArray<IRate>
}

type movieModelType = Model<IMovie, movieDocumentProps>

export default movieModelType