const schemas = require('./schemas');  // Ensure the correct path
const { sendResponse } = require('../util/utilities.js');

const supportedMethods = ['post', 'put', 'patch', 'delete']; // Supported HTTP methods

const validationOptions = {
  abortEarly: false,  // Collect all validation errors instead of stopping at the first
  allowUnknown: false,  // Disallow unknown keys in the request body
  stripUnknown: false,  // Keep unknown keys in the request body
};

const schemaValidator = (path) => {
  // Get the schema based on the path (defined in schemas.js)
  const schema = schemas[path];

  // If schema is not found for the given path, throw an error
  if (!schema) {
    throw new Error(`Schema not found for path: ${path}`);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();

    // If the request method is not supported, pass to next middleware
    if (!supportedMethods.includes(method)) {
      return next();
    }

    // Validate the request body using the schema for the specific path
    const { error, value } = schema.validate(req.body, validationOptions);

    // If validation fails, return a response with the error details
    if (error) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: error?.details?.map(err => err.message).join(', ') || 'Validation failed',  // Get all validation error messages
        data: {},
      });
    }

    // If validation passes, modify the request body with the validated value
    req.body = value;

    // Proceed to the next middleware
    return next();
  };
};

module.exports = schemaValidator;
