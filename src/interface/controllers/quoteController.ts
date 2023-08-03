import { Request, Response } from 'express';
import createQuote from 'application/use_cases/createQuote';
import getQuotes from 'application/use_cases/getQuotes';
import quoteRepository from 'infrastructure/repositories/quoteRepository';

export default {
	create: async (req: Request, res: Response): Promise<Response> => {
		try {
			const quote = await createQuote(quoteRepository, req.body);

			return res.status(201).json({
				status: 'success',
				message: 'quote created successfully',
				payload: quote,
			});
		} catch (err: unknown) {
			if (err instanceof Error) {
				return res.status(500).json({
					status: 'error',
					message: err.message || 'Error while creating quote',
					payload: [err],
				});
			}
			return res.status(500).json({
				status: 'error',
				message: 'Unknown error occurred',
				payload: [err],
			});
		}
	},

	get: async (req: Request, res: Response): Promise<Response> => {
		try {
			const lastQuotes = req?.query?.last_quotes;
			const quote = await getQuotes(quoteRepository, Number(lastQuotes as string));

			return res.status(200).json({
				status: 'success',
				message: 'quotes returned successfully',
				payload: quote,
			});
		} catch (err: unknown) {
			if (err instanceof Error) {
				return res.status(500).json({
					status: 'error',
					message: err.message || 'Error while finding all quotes',
					payload: [err],
				});
			}
			return res.status(500).json({
				status: 'error',
				message: 'Unknown error occurred',
				payload: [err],
			});
		}
	},
};
