import express from 'express'

import appConfig from './config'

const app = express()

// Apply all the app configurations
appConfig(app)


import defineAbilityForUser from './api/v1/middlewares/security/authorization/user/rules'
import IRequestUser from './api/v1/interfaces/orthers/IRequestUser'
import { Types } from 'mongoose'
import { subject } from '@casl/ability'

const user: IRequestUser = {
  id: new Types.ObjectId(),
  role: 'user'
}

const user2: IRequestUser = {
  id: new Types.ObjectId(),
  role: 'user'
}

console.log(defineAbilityForUser(user).can('read', 'Users'))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})