interface ISignUp {
  username: string,
  name: {
    first: string,
    last: string
  },
  email?: string,
  password: string
}

export default ISignUp