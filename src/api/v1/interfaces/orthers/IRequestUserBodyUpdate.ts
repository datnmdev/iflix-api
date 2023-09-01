import IUser from '../entities/IUser'

interface IRequestUserBodyUpdate extends IUser {
  password?: string
}

export default IRequestUserBodyUpdate