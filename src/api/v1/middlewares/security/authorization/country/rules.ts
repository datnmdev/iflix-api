import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityAboutCountryFor(user: IRequestUser) {
  const userAbilityBuilder = new AbilityBuilder(createMongoAbility)

  const { can, build } = userAbilityBuilder

  can('read', 'Countries')
  can('read', 'Country')

  if (user.role === 'admin') {
    can('manage', 'all')
  }

  return build()
}