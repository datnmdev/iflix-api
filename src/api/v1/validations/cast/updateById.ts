import Joi from 'joi'

const updateByIdSchema = Joi.object({
  name: Joi.string()
    .empty()
})

export default updateByIdSchema