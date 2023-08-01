/* eslint-disable class-methods-use-this */
import IQuoteRepository from 'domain/quote/IQuoteRepository';
import Quote from 'domain/quote/IQuote';
import QuoteModel from 'infrastructure/db/mongo/models/quote';

class QuoteRepository implements IQuoteRepository {
	async create(quotes: Quote[]): Promise<Quote[]> {
		const insertedQuotes = await QuoteModel.insertMany(quotes);

		return insertedQuotes;
	}

	async find(lastQuotes?: number): Promise<Quote[]> {
		let query = QuoteModel.find();

		if (lastQuotes) {
			query = query.sort({ createdAt: 'desc' }).limit(lastQuotes);
		}

		const quotes = await query.exec();

		return quotes;
	}
}

export default new QuoteRepository();
