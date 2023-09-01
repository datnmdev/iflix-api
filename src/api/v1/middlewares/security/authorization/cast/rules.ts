import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityAboutCastFor(user: IRequestUser) {
  const userAbilityBuilder = new AbilityBuilder(createMongoAbility)

  const { can, build } = userAbilityBuilder

  can('read', 'Casts')
  can('read', 'Cast')

  if (user.role === 'admin') {
    can('manage', 'all')
  }

  return build()
}