import { Types, mongo } from 'mongoose'

import PasswordCredential from '../models/PasswordCredential'
import IPasswordCredential from '../interfaces/entities/IPasswordCredential'

const passwordCredentialService = {
  findByUserId(userId: Types.ObjectId): Promise<IPasswordCredential | null> {
    return PasswordCredential.findOne({ user: userId })
  },
  createPasswordCredential(passwordCredential: IPasswordCredential, session: mongo.ClientSession | null = null) {
    const passwordCredentialDoc = new PasswordCredential(passwordCredential)
    return passwordCredentialDoc.save({ session })
  }
}

export default passwordCredentialService