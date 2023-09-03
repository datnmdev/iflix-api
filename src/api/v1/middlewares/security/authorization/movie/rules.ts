import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityAboutMovieFor(user: IRequestUser) {
  const userAbilityBuilder = new AbilityBuilder(createMongoAbility)
  const { can, build } = userAbilityBuilder

  if (user.role === 'admin') {
    can('manage', 'all')
  }

  if (user.role === 'user') {
    can('read', 'Movies')
    can('read', 'Movie')
  }

  return build()
}