import create from './create'
import getByMovieIdAndUserId from './getByMovieIdAndUserId'
import deleteByMovieIdAndUserId from './deleteByMovieIdAndUserId'

const followValidator = {
  create,
  getByMovieIdAndUserId,
  deleteByMovieIdAndUserId
}

export default followValidator