import joi from 'joi'

const signUpSchema = joi.object({
  username: joi.string()
    .required()
    .min(6)
    .alphanum()
    .lowercase(),
  name: joi.object({
    first: joi.string()
      .required(),
    last: joi.string()
      .required()
  }),
  email: joi.string()
    .required()
    .email(),
  password: joi.string()
    .required()
    .min(8),
  repeatPassword: joi.string()
    .required()
    .valid(joi.ref('password'))
})

export default signUpSchema

