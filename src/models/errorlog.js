const { Schema, model } = require('mongoose');

// Define the error log schema
const errorLogsSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    endpoint: { type: String },
    ipAddress: { type: String },
    params: { type: Object },
    errDetails: { type: Object },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      default: null,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'admins',
      default: null,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'payments',
      default: null,
    },
  },
  { timestamps: true }
);

// Create and export the ErrorLog model
const ErrorLog = model('errorLogs', errorLogsSchema);

module.exports = ErrorLog;
