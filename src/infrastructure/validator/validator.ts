import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors: any[] = [];
	errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

	return res.status(422).json({
		status: 'error',
		message: "The JSON body doesn't meet the requirements",
		payload: [
			{
				errors: extractedErrors,
			},
		],
	});
};
