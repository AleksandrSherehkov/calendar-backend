const Joi = require('joi');

const taskAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name field should be a string',
  }),
  description: Joi.string().required().messages({
    'string.base': 'description field should be a string',
  }),
  date: Joi.date().iso().required().messages({
    'date.base': 'date field should be a date',
    'date.isoDate': 'date field should be in ISO 8601 date format',
  }),

  completed: Joi.boolean().optional().messages({
    'boolean.base': 'completed field should be a boolean',
  }),
});

const queryParamSchema = Joi.object({
  filterQuery: Joi.string().allow('').optional(),
  day: Joi.number().integer().min(1).max(31).optional(),
  month: Joi.number().integer().min(1).max(12).optional(),
  year: Joi.number().integer().min(2001).optional(),
});

const taskUpdateCompletedSchema = Joi.object({
  completed: Joi.boolean().required().messages({
    'boolean.base': 'completed field should be a boolean',
  }),
});

module.exports = {
  taskAddSchema,
  queryParamSchema,
  taskUpdateCompletedSchema,
};
