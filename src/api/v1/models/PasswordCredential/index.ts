import {model} from 'mongoose'

import passwordCredentialSchema from './schema'
import IPasswordCredential from '../../interfaces/entities/IPasswordCredential'

const PasswordCredential = model<IPasswordCredential>('passwordCredential', passwordCredentialSchema)

export default PasswordCredential