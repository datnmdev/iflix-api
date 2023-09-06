import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import { Types } from 'mongoose'

export default function defineAbilityAboutCommentFor(user: IRequestUser = { id: new Types.ObjectId(), role: 'guest' }) {
  const userAbilityBuilder = new AbilityBuilder(createMongoAbility)

  const { can, build } = userAbilityBuilder

  can('read', 'Comment')
  
  if (user.role === 'admin') {
    can('manage', 'all')
  }

  if (user.role === 'user') {
    can('create', 'Comment')
    can('update', 'Comment', { author: user.id })
    can('update', 'Like')
    can('update', 'Dislike')
    can('delete', 'Comment', { author: user.id })
  }

  return build()
}