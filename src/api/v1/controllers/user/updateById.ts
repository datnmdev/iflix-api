import { NextFunction, Request, Response } from 'express'
import lodash from 'lodash'
import { permittedFieldsOf } from '@casl/ability/extra'
import { Types } from 'mongoose'
import bcrypt from 'bcrypt'
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

import defineAbilityForUser from '../../middlewares/security/authorization/user/rules'
import userSevice from '../../services/user'
import passwordCredentialService from '../../services/password'
import IRequestUser from '../../interfaces/orthers/IRequestUser'
import IRequestUserBodyUpdate from '../../interfaces/orthers/IRequestUserBodyUpdate'

dotenv.config()

const UPLOADS_USER_PATH = process.env.UPLOADS_USER_PATH as string

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IRequestUser = req.user as IRequestUser
    const userData: IRequestUserBodyUpdate = req.body as IRequestUserBodyUpdate

    if (req.file) {
      userData.avatar = path.join(UPLOADS_USER_PATH, req.params.id + '.' + req.file.mimetype.split('/')[1])
      await fs.promises.rename(req.file.path, path.join('public', userData.avatar))
    }

    const permittedFields = permittedFieldsOf(await defineAbilityForUser(user), 'update', 'User', { fieldsFrom: rule => rule.fields || ['name.first', 'name.last', 'email', 'avatar'] })
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
    // Delete the successfully uploaded file (if any) previously
    if (req.body.avatar) {
      const avatarPath = path.join(process.cwd(), 'public', req.body.avatar)
      try {
        await fs.promises.access(avatarPath, fs.constants.F_OK)
        await fs.promises.unlink(avatarPath)
      } catch (error) {
        next(error)
      }
    } else if (req.file) {
      const avatarPath = path.join(process.cwd(), req.file.path)
      try {
        await fs.promises.access(avatarPath, fs.constants.F_OK)
        await fs.promises.unlink(avatarPath)
      } catch (error) {
        next(error)
      }
    }

    return res.status(400).json({
      status: 'Bad Request',
      message: 'Nothing to update'
    })
  }
}

export default updateById