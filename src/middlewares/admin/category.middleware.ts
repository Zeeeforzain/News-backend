import { NextFunction } from 'express';

import { isValidObjectId } from 'mongoose';

export const isCategoryValid = async (
	req: any,
	res: any,
	next: NextFunction
) => {
	try {         
		const { newsId } = req.params;
		

		if (!isValidObjectId(newsId)) {
			return sendResponse(res, {
				statusCode: 500,
				success: false,
				message: 'Invlaid newsID.',
				data: {},
			});
		}

		const userDetails = await User.countDocuments(
			{
				_id: newsId,
			},
		);

		if (!userDetails) {
			return sendResponse(res, {
				statusCode: 500,
				success: false,
				message: 'News not found.',
				data: {},
			});
		}

		if (!userDetails.category || !userDetails.category) {
			return sendResponse(res, { 
				statusCode: 500,
				success: false,
				message: 'News not found.',
				data: {},
			});}

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
