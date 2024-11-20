// const schemas = require('./schemas.js');
const { sendResponse } = require('../util/utilities.js');

const supportedMethods = ['post', 'put', 'patch', 'delete'];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (path) => {
  const schema = schemas[path];

  if (!schema) {
    throw new Error(`Schema not found for path: ${path}`);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

    const { error, value } = schema.validate(req.body, validationOptions);
    if (error) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: error?.details[0].message,
        data: {},
      });
    }

    // validation successful
    req.body = value;
    return next();
  };
};

module.exports = schemaValidator;