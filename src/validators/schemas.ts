import Joi, { ObjectSchema} from 'joi';
import { JoiObjectId } from '../util/utilities';
const PASSWORD_REGEX = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*]){12}'
);

const adminSignup = Joi.object().keys({
	email: Joi.string().trim().lowercase().empty().email().required(),
	password: Joi.string().max(100).pattern(PASSWORD_REGEX).required(),
});

const createNews = Joi.object().keys({
	heading: Joi.string().required().trim().empty(),
	description: Joi.string().required().trim().empty(),
	countryId: Joi.string().trim().lowercase().empty().email().required(),
	city: Joi.string().max(100).required(),
    tags:Joi.string().required().trim().empty(),
    categoryId:JoiObjectId().required().trim().empty(),
});

export default {
	'/admin/signup': adminSignup,
    '/news/create': createNews,
} as { [key: string]: ObjectSchema };