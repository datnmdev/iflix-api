import Joi from 'joi'

const updateByIdSchema = Joi.object({
  title: Joi.string()
    .empty(),
  alias: Joi.array(),
  description: Joi.string(),
  posterUrl: Joi.string()
    .uri({ relativeOnly: true }),
  release: Joi.number(),
  duration: Joi.string(),
  episodeCount: Joi.number()
    .equal(),
  genres: Joi.array()
})