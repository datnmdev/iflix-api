import {model} from 'mongoose'

import googleCredentialSchema from './schema'
import IGoogleCredential from '../../interfaces/entities/IGoogleCredential'

const GoogleCredential = model<IGoogleCredential>('googleCredential', googleCredentialSchema)

export default GoogleCredential