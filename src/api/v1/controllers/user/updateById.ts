import { Request, Response } from 'express'
import lodash from 'lodash'
import { permittedFieldsOf } from '@casl/ability/extra'
import { Types } from 'mongoose'
import bcrypt from 'bcrypt'

import defineAbilityForUser from '../../middlewares/security/authorization/user/rules'
import IRequestUser from '../../interfaces/orthers/IRequestUser'
import userSevice from '../../services/userService'
import passwordCredentialService from '../../services/passwordCredentialService'

const updateById = async (req: Request, res: Response) => {
  try {
    const permittedFields = permittedFieldsOf(await defineAbilityForUser(req.user as IRequestUser), 'update', 'User', { fieldsFrom: rule => rule.fields || ['name.first', 'name.last', 'email'] })
    const infoWithPermittedFields = lodash.pick(req.body, permittedFields)

    await userSevice.findByIdAndUpdate(new Types.ObjectId(req.params.id), infoWithPermittedFields)

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const infoWillBeApplied = { 
        password: hashedPassword,
        salt
      }

      await passwordCredentialService.findByUserIdAndUpdate(new Types.ObjectId(req.params.id), infoWillBeApplied)
    }

    return res.status(200).json({
      status: 'OK',
      message: 'The user information has been successfully updated'
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'Nothing to update'
    })
  }

}

export default updateById