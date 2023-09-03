import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityAboutFollowFor(user: IRequestUser) {
  const { can, build } = new AbilityBuilder(createMongoAbility)

  if (user.role === 'user') {
    can('read', 'Follow', { id: user.id })
    can('create', 'Follow')
    can('delete', 'Follow', { id: user.id })
  }

  return build()
}