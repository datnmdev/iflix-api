import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityAboutRateFor(user: IRequestUser) {
  const { can, build } = new AbilityBuilder(createMongoAbility)

  if (user.role === 'user') {
    can('read', 'Rate')
    can('create', 'Rate')
    can('update', 'Rate')
  } else if (user.role === 'admin') {
    can('manage', 'all')
  }

  return build()
}