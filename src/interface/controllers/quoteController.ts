import { Request, Response } from 'express';
import createQuote from 'application/createQuote';
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
                    message: err.message || 'Error while finding all users',
                    payload: [err],
                });
            } else {
                return res.status(500).json({
                    status: 'error',
                    message: 'Unknown error occurred',
                    payload: [err],
                });
            }
        }
    },

    // get: async (req: Request, res: Response): Promise<Response> => {
    //     try {
    //         const quote = await getQuote(req.body);

    //         return res.status(200).json({
    //             status: 'success',
    //             message: 'quote created successfully',
    //             payload: quote,
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             status: 'error',
    //             message: err.message || 'Error while find all users',
    //             payload: [err],
    //         });
    //     }
    // }
}