import { ObjectId } from 'mongoose'

interface IEvaluation {
  movieId: ObjectId,
  violenceLevel: number,
  discomfort: number,
  duration: number,
  genre: number,
  suitableAge: number
}

export default IEvaluation