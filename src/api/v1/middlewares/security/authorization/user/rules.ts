import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityForUser(user: IRequestUser) {
  const userAbilityBuilder = new AbilityBuilder(createMongoAbility)

  const { can, cannot, build } = userAbilityBuilder

  if (user.role === 'admin') {
    can('manage', 'all')
  }
  
  if (user.role === 'user') {
    can('read', 'User', { id: user.id })
    cannot('read', 'Users')
    cannot('create', 'User')
    can('update', 'User', ['name.first', 'name.last', 'email', 'password'], { id: user.id })
    cannot('delete', 'User')
  }

  return build()
}

