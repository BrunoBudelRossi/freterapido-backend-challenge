/* eslint-disable class-methods-use-this */
import IQuoteRepository from 'domain/quote/IQuoteRepository';
import { IQuote } from 'domain/quote/IQuote';
import QuoteModel from 'infrastructure/db/mongo/models/quote';

class QuoteRepository implements IQuoteRepository {
	async create(quotes: IQuote[]): Promise<IQuote[]> {
		const insertedQuotes = await QuoteModel.insertMany(quotes);

		return insertedQuotes;
	}

	async find(lastQuotes?: number): Promise<IQuote[]> {
		let query = QuoteModel.find();

		if (lastQuotes) {
			query = query.sort({ createdAt: 'desc' }).limit(lastQuotes);
		}

		const quotes = await query.exec();

		return quotes;
	}
}

export default new QuoteRepository();
