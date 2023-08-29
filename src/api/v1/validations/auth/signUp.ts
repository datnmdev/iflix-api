import joi from 'joi'

const signUpSchema = joi.object({
  username: joi.string()
    .required()
    .empty()
    .min(6)
    .alphanum()
    .lowercase(),
  name: joi.object({
    first: joi.string()
      .required()
      .empty(),
    last: joi.string()
      .required()
      .empty()
  }),
  email: joi.string()
    .required()
    .empty()
    .email(),
  password: joi.string()
    .required()
    .empty()
    .min(8),
  repeatPassword: joi.string()
    .required()
    .empty()
    .valid(joi.ref('password'))
})

export default signUpSchema

