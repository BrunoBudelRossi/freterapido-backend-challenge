import { connect, close } from '../../src/infrastructure/db/mongo/connection';
import QuoteRepository from '../../src/infrastructure/repositories/quoteRepository';
import { IQuote } from '../../src/domain/quote/IQuote';
import QuoteModel from '../../src/infrastructure/db/mongo/models/quote';

describe('QuoteRepository', () => {
	beforeAll(() => {
		connect('test');
	});

    beforeEach(async () => {
        await QuoteModel.deleteMany({}).exec();
    });

	afterAll(() => {
		close();
	});

	describe('create', () => {
		it('should insert quotes into the database', async () => {
			const quotes: IQuote[] = [
				{
                    name: 'UBER',
                    service: 'Express',
                    deadline: 4,
                    price: 100.0,
                },
                {
                    name: 'CORREIOS',
                    service: 'PAC',
                    deadline: 5,
                    price: 92.45,
                },
			];

			const insertedQuotes = await QuoteRepository.create(quotes);

			expect(insertedQuotes).toHaveLength(2);
			expect(insertedQuotes[0]).toHaveProperty('_id');
			expect(insertedQuotes[1]).toHaveProperty('_id');
		});
	});

	describe('find', () => {
		it('should find all quotes when no lastQuotes parameter is provided', async () => {
			const quotesInDB: IQuote[] = [
				{
                    name: 'UBER',
                    service: 'Express',
                    deadline: 4,
                    price: 100.0,
                },
                {
                    name: 'CORREIOS',
                    service: 'PAC',
                    deadline: 5,
                    price: 92.45,
                },
			];

			await QuoteRepository.create(quotesInDB);

			const foundQuotes = await QuoteRepository.find();

			expect(foundQuotes).toHaveLength(2);
			expect(foundQuotes[0]).toHaveProperty('name')
			expect(foundQuotes[1]).toHaveProperty('name')
		});

		it('should find the last N quotes when lastQuotes parameter is provided', async () => {
			const quotesInDB: IQuote[] = [
				{
                    name: 'UBER',
                    service: 'Express',
                    deadline: 4,
                    price: 100.0,
                },
                {
                    name: 'CORREIOS',
                    service: 'PAC',
                    deadline: 5,
                    price: 92.45,
                },
			];

			await QuoteRepository.create(quotesInDB);

			const foundQuotes = await QuoteRepository.find(1);

			expect(foundQuotes).toHaveLength(1);
		});
	});
});
