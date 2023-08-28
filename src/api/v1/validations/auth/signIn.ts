import joi from 'joi'

const signInSchema = joi.object({
  username: joi.string()
    .required()
    .min(6)
    .alphanum()
    .lowercase(),
  password: joi.string()
    .required()
    .min(8)
})

export default signInSchema

