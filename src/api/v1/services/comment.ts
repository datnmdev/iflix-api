import { ClientSession, PipelineStage, Types, UpdateQuery } from 'mongoose'

import Comment from '../models/Comment'
import IComment from '../interfaces/entities/IComment'

const commentService = {
  findById(id: Types.ObjectId) {
    return Comment.findOne({ _id: id })
  },
  findByMovieId(movieId: Types.ObjectId, page: number) {
    return Comment.aggregate([
      {
        $lookup: {
          from: 'episodes',
          localField: 'episode',
          foreignField: '_id',
          as: 'episode'
        }
      },
      {
        $unwind: '$episode'
      },
      {
        $match: {
          'episode.movie': movieId,
          parent: { $exists: false }
        }
      },
      {
        $project: {
          _id: 1,
          pin: 1,
          text: 1,
          likes: 1,
          dislikes: 1,
          author: 1,
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $sort: {
          pin: -1,
          createdAt: -1,
          updatedAt: -1
        }
      },
      {
        $skip: (page - 1) * 20
      },
      {
        $limit: page * 20
      }
    ])
  },
  findByEpisodeId(episodeId: Types.ObjectId, page: number) {
    return Comment.find({ episode: episodeId, parent: { $exists: false } }, { _id: 1, pin: 1, text: 1, likes: 1, dislikes: 1, author: 1, replies: 1, createdAt: 1, updatedAt: 1 })
      .sort({ pin: -1, createdAt: -1, updatedAt: -1 })
      .skip((page - 1) * 20)
      .limit(page * 20)
  },
  findChildByParentId(parentId: Types.ObjectId, page: number | undefined = undefined) {
    Comment.aggregate()
    const pipeline: PipelineStage[] = [
      {
        $match: {
          _id: parentId
        }
      },
      {
        $graphLookup: {
          from: 'comments',
          startWith: '$replies',
          connectFromField: 'replies',
          connectToField: '_id',
          as: 'descendants'
        }
      },
      {
        $unwind: '$descendants'
      },
      {
        $project: {
          _id: '$descendants._id',
          pin: '$descendants.pin',
          text: '$descendants.text',
          likes: '$descendants.likes',
          dislikes: '$descendants.dislikes',
          author: '$descendants.author',
          createdAt: '$descendants.createdAt',
          updatedAt: '$descendants.updatedAt'
        }
      },
      {
        $sort: {
          createdAt: 1,
          updatedAt: 1
        }
      },
    ]

    if (page) {
      pipeline.concat([
        {
          $skip: page ? (page - 1) * 10 : 0
        },
        {
          $limit: page ? page * 10 : 0
        }
      ])
    }

    return Comment.aggregate(pipeline)
  },
  create(comment: IComment, session: ClientSession | null = null) {
    const commentDoc = new Comment(comment)
    return commentDoc.save({ session })
  },
  updateById(id: Types.ObjectId, infoWillBeApplied: UpdateQuery<IComment> | undefined) {
    return Comment.findByIdAndUpdate(id, infoWillBeApplied)
  },
  deleteById(id: Types.ObjectId, session: ClientSession | null = null) {
    return Comment.deleteOne({ _id: id }, { session })
  },
  deleteManyByIds(ids: Types.Array<Types.ObjectId | never>, session: ClientSession | null = null) {
    return Comment.deleteMany({ _id: { $in: ids } }, { session })
  },
  findByIdAndUpdate(id: Types.ObjectId, infoWillBeApplied: UpdateQuery<IComment> | undefined) {
    return Comment.findByIdAndUpdate(id, infoWillBeApplied)
  },
  findByUserIdAndDelete(userId: Types.ObjectId, session: ClientSession | null = null) {
    return Comment.deleteMany({ user: userId }, { session })
  },
  findByEpisodeIdAndDelete(episodeId: Types.ObjectId, session: ClientSession | null = null) {
    return Comment.deleteMany({ episode: episodeId }, { session })
  }
}

export default commentService