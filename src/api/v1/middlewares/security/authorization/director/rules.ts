import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityAboutDirectorFor(user: IRequestUser) {
  const userAbilityBuilder = new AbilityBuilder(createMongoAbility)

  const { can, build } = userAbilityBuilder

  can('read', 'Directors')
  can('read', 'Director')

  if (user.role === 'admin') {
    can('manage', 'all')
  }

  return build()
}