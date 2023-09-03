import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityAboutRateFor(user: IRequestUser) {
  const { can, build } = new AbilityBuilder(createMongoAbility)

  if (user.role === 'user') {
    can('read', 'Rate')
    can('create', 'Rate')
    can('update', 'Rate')
  }

  return build()
}