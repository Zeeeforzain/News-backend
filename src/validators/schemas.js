// schemas.js
const Joi = require('joi');

const PASSWORD_REGEX = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*]){12}'
);
const JoiObjectId = (message = 'valid id') =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);

const adminSignup = Joi.object().keys({
  email: Joi.string().trim().lowercase().empty().email().required(),
  password: Joi.string().max(100).pattern(PASSWORD_REGEX).required(),
});

const adminLogin = Joi.object().keys({
  email: Joi.string().trim().lowercase().empty().email().required(),
  password: Joi.string().required(),
});

const createNews = Joi.object().keys({
  heading: Joi.string().required().trim().empty(),
  description: Joi.string().required().trim().empty(),
  countryId: JoiObjectId().trim().empty().required(),
  city: Joi.string().max(100).required(),
  tags: Joi.string().required().trim().empty(),
  categoryId: JoiObjectId().required().trim().empty(),
});

const updateNews = Joi.object().keys({
  heading: Joi.string().optional().trim().empty(),
  description: Joi.string().optional().trim().empty(),
  countryId: JoiObjectId().trim().empty().optional(),
  city: Joi.string().max(100).optional(),
  tags: Joi.string().optional().trim().empty(),
  categoryId: JoiObjectId().optional().trim().empty(),
});

module.exports = {
  '/admin/signup': adminSignup,
  '/admin/login': adminLogin,
  '/news/create': createNews,
  '/news/update': updateNews,  // Add the update schema here
};
