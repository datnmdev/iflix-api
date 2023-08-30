import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityAboutGenreFor(user: IRequestUser) {
  const userAbilityBuilder = new AbilityBuilder(createMongoAbility)

  const { can, build } = userAbilityBuilder

  can('read', 'Genres')
  can('read', 'Genre')

  if (user.role === 'admin') {
    can('manage', 'all')
  }

  return build()
}