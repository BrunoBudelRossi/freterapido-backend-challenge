import { IQuote, IQuoteByName } from '../../src/domain/quote/IQuote';
import IQuoteRepository from '../../src/domain/quote/IQuoteRepository';
import getQuotes from '../../src/application/use_cases/getQuotes';

describe('getQuotes', () => {
	const mockQuotes: IQuote[] = [
		{
			name: 'UBER',
			service: 'Normal',
			deadline: 4,
			price: 60.74,
		},
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
		{
			name: 'CORREIOS',
			service: 'SEDEX',
			deadline: 5,
			price: 150.0,
		},
	];

	const mockQuoteRepository: IQuoteRepository = {
        find: jest.fn(async (lastQuotes?: number) => {
            if (lastQuotes && lastQuotes > 0) {
                return mockQuotes.slice(-lastQuotes);
            }
            return mockQuotes;
        }),
        create: function (quotes: IQuote[]): Promise<IQuote[]> {
            throw new Error('Function not implemented.');
        }
    };

	it('should return the more expensive and cheapest shipping quotes', async () => {
		const result = await getQuotes(mockQuoteRepository);

		expect(result).toHaveProperty('moreExpensiveShipping');
		expect(result).toHaveProperty('cheapestShipping');
		expect(result.moreExpensiveShipping.price).toEqual(150.0);
		expect(result.cheapestShipping.price).toEqual(60.74);
	});

	it('should return the list of quotes grouped by name', async () => {
		const result = await getQuotes(mockQuoteRepository);

		expect(result).toHaveProperty('carrier');
		expect(result.carrier).toHaveLength(2); 

		const uberQuote: IQuoteByName | undefined = result.carrier.find((item) => item.name === 'UBER');
		expect(uberQuote).toBeDefined();
		expect(uberQuote?.amount).toEqual(2); 
		expect(uberQuote?.totalPrice).toEqual(160.74);
		expect(uberQuote?.priceAvg).toEqual(80.37); 

		const correiosQuote: IQuoteByName | undefined = result.carrier.find((item) => item.name === 'CORREIOS');
		expect(correiosQuote).toBeDefined();
		expect(correiosQuote?.amount).toEqual(2); 
		expect(correiosQuote?.totalPrice).toEqual(242.45); 
		expect(correiosQuote?.priceAvg).toEqual(121.22); 
	});

	it('should return the last N quotes when `lastQuotes` parameter is provided', async () => {
		const lastQuotes = 2;
		const result = await getQuotes(mockQuoteRepository, lastQuotes);
        
        let usedRecords = 0;
        result.carrier.forEach((item) => {
            usedRecords += item.amount;
        });

		expect(result).toHaveProperty('moreExpensiveShipping');
		expect(result).toHaveProperty('cheapestShipping');
        expect(usedRecords).toEqual(lastQuotes);
	});

	it('should return an empty result when no quotes are available', async () => {
		const emptyQuoteRepository: IQuoteRepository = {
            find: jest.fn(async () => []),
            create: function (quotes: IQuote[]): Promise<IQuote[]> {
                throw new Error('Function not implemented.');
            }
        };

		const result = await getQuotes(emptyQuoteRepository);

		expect(result).toEqual({
			moreExpensiveShipping: { name: '', service: '', deadline: 0, price: 0 },
			cheapestShipping: { name: '', service: '', deadline: 0, price: 0 },
			carrier: [],
		});
	});
});
