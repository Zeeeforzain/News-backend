const Joi = require('joi');
const { Types } = require('mongoose');
const ErrorLog = require('../models/errorlog');
const jsonwebtoken = require('jsonwebtoken');

// Helper function to validate ObjectId
const JoiObjectId = (message = 'valid id') =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);

// Helper function to compare two objects
const objectsEqual = (o1, o2) => {
  let isEqual = false;

  if (typeof o1 === 'object' && Object.keys(o1).length > 0) {
    if (Object.keys(o1).length === Object.keys(o2).length) {
      isEqual = Object.keys(o1).every((p) => {
        if (Array.isArray(o1[p])) {
          return arraysEqual(o1[p], o2[p]);
        } else if (Types.ObjectId.isValid(o1[p])) {
          return new Types.ObjectId(o1[p]).equals(o2[p]);
        } else {
          return o1[p] === o2[p];
        }
      });
    }
  } else {
    isEqual = o1 === o2;
  }

  return isEqual;
};

// Helper function to compare two arrays
const arraysEqual = (a1, a2) => {
  return (
    a1.length === a2.length && a1.every((o) => a2.find((o2) => o2 === o))
  );
};

// Helper function to send a response
const sendResponse = (res, payload) => {
  return res.status(payload.statusCode).json({
    success: payload.success,
    message: payload.message,
    data: payload.data,
  });
};

// Function to save error log to the database
const saveErrorLog = async (payload) => {
  return await new ErrorLog({
    endpoint: payload.endpoint,
    ipAddress: payload.ipAddress,
    params: payload.params,
    errDetails: payload.errDetails,
    userId: payload.userId,
    adminId: payload.adminId,
    paymentId: payload.paymentId,
  }).save();
};

// Function to verify JWT token
const verifyJWTToken = (token) => {
  return jsonwebtoken.verify(
    token.split(' ')[1],
    process.env.JWT_SECRET || ''
  );
};

// Exporting all utility functions
module.exports = {
  JoiObjectId,
  objectsEqual,
  arraysEqual,
  sendResponse,
  saveErrorLog,
  verifyJWTToken,
};
