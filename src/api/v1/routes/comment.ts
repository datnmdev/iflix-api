import { Router } from 'express'

import commentValidator from '../validations/comment'
import authentication from '../middlewares/security/authentication'
import authorization from '../middlewares/security/authorization'
import commentController from '../controllers/comment'

const commentRouter = Router()

commentRouter.get('/', commentValidator.getByMovieId, authorization.comment.getByMovieId, commentController.getByMovieId, commentValidator.getByEpisodeId, authorization.comment.getByEpisodeId, commentController.getByEpisodeId, commentValidator.getChildByParentId, authorization.comment.getChildByParentId, commentController.getChildByParentId)

commentRouter.post('/', commentValidator.create, authentication.authenticateAccessToken, authorization.comment.create, commentController.create)

commentRouter.put('/:id', commentValidator.like, authentication.authenticateAccessToken, authorization.comment.like, commentController.like, commentValidator.dislike, authentication.authenticateAccessToken, authorization.comment.dislike, commentController.dislike,  commentValidator.updateById, authentication.authenticateAccessToken, authorization.comment.updateById, commentController.updateById)

commentRouter.delete('/:id', commentValidator.deleteById, authentication.authenticateAccessToken, authorization.comment.deleteById, commentController.deleteById)

export default commentRouter