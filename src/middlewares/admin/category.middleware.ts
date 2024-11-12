import { NextFunction } from 'express';

import { isValidObjectId } from 'mongoose';
import category from '../../models/category';

export const isCategoryValid = async (
	req: any,
	res: any,
	next: NextFunction
) => {
	try {         
		const { categoryId } = req.params;
		

		if (!isValidObjectId(categoryId)) {
			return sendResponse(res, {
				statusCode: 500,
				success: false,
				message: 'Invlaid categoryID.',
				data: {},
			});
		}

		const categoryDetails = await category.countDocuments(
			{
				_id: categoryId,
			},
		);
		next();
	} catch (err: any) {
		saveErrorLog({
			endpoint: req.originalUrl,
			params: Object.assign({
				urlParams: req.params,
				queryParams: req.query,
				bodyParams: req.body,
			}),
			errDetails: err,
			userId: null,
			adminId: req.user ? req.user._id : null,
		});

		return sendResponse(res, {
			statusCode: 500,
			success: false,
			message: 'Error occurred. Please try again later.',
			data: {},
		});
	}
};
