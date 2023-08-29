import Joi from 'joi'

const updateByIdSchema = Joi.object({
  name: Joi.object({
    first: Joi.string()
      .empty(),
    last: Joi.string()
      .empty()
  }),
  email: Joi.string()
    .empty()
    .email(),
  password: Joi.string()
    .empty()
    .min(8)
})

export default updateByIdSchema