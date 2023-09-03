import create from './create'
import updateByMovieIdAndUserId from './updateByMovieIdAndUserId'
import getByMovieIdAndUserId from './getByMovieIdAndUserId'

const rateValidator = {
  create,
  updateByMovieIdAndUserId,
  getByMovieIdAndUserId
}

export default rateValidator