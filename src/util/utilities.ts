import { ObjectId, Types } from 'mongoose';
import Joi from 'joi';
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