import { Schema, model, ObjectId } from 'mongoose';

interface IErrorLog {
	_id: ObjectId;
	endpoint: string;
	params: object;
	errDetails: object;
	userId: ObjectId;
	adminId: ObjectId;
	paymentId: ObjectId;
	ipAddress: string;
}

const errorLogsSchema = new Schema<IErrorLog>(
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

const ErrorLog = model<IErrorLog>('errorLogs', errorLogsSchema);

export default ErrorLog;
