import create from './create'
import updateById from './updateById'
import deleteById from './deleteById'
import getByMovieId from './getByMovieId'
import getByEpisodeId from './getByEpisodeId'
import getChildByParentId from './getChildByParentId'
import like from './like'
import dislike from './dislike'

const comment = {
  create,
  updateById,
  deleteById,
  getByMovieId,
  getByEpisodeId,
  getChildByParentId,
  like,
  dislike
}

export default comment