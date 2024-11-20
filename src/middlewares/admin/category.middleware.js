// import { NextFunction } from 'express';
// import category from '../../models/category';
// import { sendResponse, saveErrorLog } from '../../util/utilities';
// export const isCategoryValid = async (
// 	req: any,
// 	res: any,
// 	next: NextFunction
// ) => {
// 	try {         
// 		const { categoryId } = req.params;
// 		const categoryExists = await category.countDocuments({ _id: categoryId });

// 		if (!categoryExists) {
// 			return sendResponse(res, {
// 				statusCode: 404,
// 				success: false,
// 				message: 'Category not found.',
// 				data: {},
// 			});
// 		}

// 		next();
// 	} catch (err: any) {
// 		saveErrorLog({
// 			endpoint: req.originalUrl,
// 			params: {
// 				urlParams: req.params,
// 				queryParams: req.query,
// 				bodyParams: req.body,
// 			},
// 			errDetails: err,
// 			userId: null,
// 			adminId: req.user ? req.user._id : null,
// 		});

// 		return sendResponse(res, {
// 			statusCode: 500,
// 			success: false,
// 			message: 'Error occurred. Please try again later.',
// 			data: {},
// 		});
// 	}
// };
const category = require('../../models/category');
const { sendResponse, saveErrorLog } = require('../../util/utilities');

const isCategoryValid = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const categoryExists = await category.countDocuments({ _id: categoryId });

    if (!categoryExists) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Category not found.',
        data: {},
      });
    }

    next();
  } catch (err) {
    saveErrorLog({
      endpoint: req.originalUrl,
      params: {
        urlParams: req.params,
        queryParams: req.query,
        bodyParams: req.body,
      },
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

module.exports = isCategoryValid;
