import create from './create'
import deleteByMovieIdAndUserId from './deleteByMovieIdAndUserId'
import getByUserId from './getByUserId'
import getByMovieIdAndUserId from './getByMovieIdAndUserId'

const followController = {
  create,
  deleteByMovieIdAndUserId,
  getByUserId,
  getByMovieIdAndUserId
}

export default followController