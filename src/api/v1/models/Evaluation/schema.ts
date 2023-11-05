import {Schema, Model} from 'mongoose'

import IEvaluation from '../../interfaces/entities/IEvaluation'

const evaluationSchema = new Schema<IEvaluation, Model<IEvaluation>>({
  movieId: {
    type: Schema.ObjectId,
    required: true
  },
  violenceLevel: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  discomfort: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  genre: {
    type: Number,
    required: true
  },
  suitableAge: {
    type: Number,
    min: 1,
    max: 100,
    required: true
  }
}, {
  timestamps: true
})

export default evaluationSchema