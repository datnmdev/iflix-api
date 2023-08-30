import { ClientSession, Types } from 'mongoose'

import PasswordCredential from '../models/PasswordCredential'
import IPasswordCredential from '../interfaces/entities/IPasswordCredential'

const passwordCredentialService = {
  findByUserId(userId: Types.ObjectId) {
    return PasswordCredential.findOne({ user: userId })
  },
  createPasswordCredential(passwordCredential: IPasswordCredential, session: ClientSession | null = null) {
    const passwordCredentialDoc = new PasswordCredential(passwordCredential)
    return passwordCredentialDoc.save({ session })
  },
  findByUserIdAndUpdate(userId: Types.ObjectId, infoWillBeApplied: any) {
    return PasswordCredential.findOneAndUpdate({ user: userId }, infoWillBeApplied)
  },
  findByUserIdAndDelete(id: Types.ObjectId, session: ClientSession | null = null) {
    return PasswordCredential.findOneAndDelete({ user: id }, { session })
  }
}

export default passwordCredentialService