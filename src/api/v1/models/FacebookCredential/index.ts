import {model} from 'mongoose'

import facebookCredentialSchema from './schema'
import IFacebookCredential from '../../interfaces/entities/IFacebookCredential'

const FacebookCredential = model<IFacebookCredential>('facebookCredential', facebookCredentialSchema)

export default FacebookCredential