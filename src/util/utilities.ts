import { ObjectId, Types } from 'mongoose';
import Joi from 'joi';
import ErrorLog from '../models/errorlog';
import { Response } from 'express';


interface IResponsePayload {
	statusCode: number;
	success: boolean;
	message: string;
	data: any;
}

export const JoiObjectId = (message = 'valid id') =>
	Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);

export const objectsEqual: any = (o1: any, o2: any) => {
	let isEqual = false;

	if (typeof o1 === 'object' && Object.keys(o1).length > 0) {
		if (Object.keys(o1).length === Object.keys(o2).length) {
			isEqual = Object.keys(o1).every((p: any) => {
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
export const arraysEqual = (a1: any[], a2: any[]) => {
	return (
		a1.length === a2.length && a1.every((o) => a2.find((o2) => o2 === o))
	);
};

export const sendResponse = (res: Response, payload: IResponsePayload) => {
	return res.status(payload.statusCode).json({
		success: payload.success,
		message: payload.message,
		data: payload.data,
	});
};

export const saveErrorLog = async (payload: {
	endpoint?: string | null;
	ipAddress?: string | null;
	params?: object | null;
	errDetails?: object | null;
	userId?: ObjectId | null;
	adminId?: ObjectId | null;
	paymentId?: ObjectId | null;
}) => {
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
