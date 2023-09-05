import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityAboutHistoryFor(user: IRequestUser) {
  const userAbilityBuilder = new AbilityBuilder(createMongoAbility)

  const { can, build } = userAbilityBuilder

  if (user.role === 'admin') {
    can('manage', 'all')
  }

  if (user.role === 'user') {
    can('read', 'History')
    can('create', 'History')
  }

  return build()
}