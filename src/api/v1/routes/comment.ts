import { Router } from 'express'

import commentValidator from '../validations/comment'
import commentController from '../controllers/comment'
import securityMiddlware from '../middlewares/security'

const commentRouter = Router()

commentRouter.get('/', commentValidator.getByMovieId, securityMiddlware.authorization.comment.getByMovieId, commentController.getByMovieId, commentValidator.getByEpisodeId, securityMiddlware.authorization.comment.getByEpisodeId, commentController.getByEpisodeId, commentValidator.getChildByParentId, securityMiddlware.authorization.comment.getChildByParentId, commentController.getChildByParentId)

commentRouter.post('/', commentValidator.create, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.comment.create, commentController.create)

commentRouter.put('/:id', commentValidator.like, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.comment.like, commentController.like, commentValidator.dislike, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.comment.dislike, commentController.dislike,  commentValidator.updateById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.comment.updateById, commentController.updateById)

commentRouter.delete('/:id', commentValidator.deleteById, securityMiddlware.authentication.authenticateAccessToken, securityMiddlware.authorization.comment.deleteById, commentController.deleteById)

export default commentRouter