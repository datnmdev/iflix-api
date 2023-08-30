import Joi from 'joi'

const updateByIdSchema = Joi.object({
  name: Joi.string()
    .empty(),
  description: Joi.string()
})

export default updateByIdSchema