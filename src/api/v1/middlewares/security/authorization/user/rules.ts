import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'
import userSevice from '../../../../services/user'

export default async function defineAbilityForUser(user: IRequestUser) {
  const adminUserIdList = (await userSevice.findByRole('admin', { _id: 1 })).map(user => user._id)

  const userAbilityBuilder = new AbilityBuilder(createMongoAbility)
  const { can, cannot, build } = userAbilityBuilder

  if (user.role === 'admin') {
    can('manage', 'all')
    cannot('delete', 'User', { id: { $in: adminUserIdList } })
  }
  
  if (user.role === 'user') {
    can('read', 'User', { id: user.id })
    cannot('read', 'Users')
    cannot('create', 'User')
    can('update', 'User', ['name.first', 'name.last', 'email', 'avatar'], { id: user.id })
    cannot('delete', 'User')
  }

  return build()
}

