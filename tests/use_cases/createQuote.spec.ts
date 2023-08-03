import MockAdapter from 'axios-mock-adapter';
import { Shipping } from '../../src/domain/shipping/IShipping';
import createQuote from '../../src/application/use_cases/createQuote';
import axiosInstance from '../../src/infrastructure/gateway/axiosClient';
import IQuoteRepository from '../../src/domain/quote/IQuoteRepository';
import { IQuote } from '../../src/domain/quote/IQuote';

describe('createQuote', () => {
	let axiosMock: MockAdapter;
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
		create: jest.fn(async (quotes: IQuote[]) => {
			return mockQuotes;
		}),
		find: function (lastQuotes?: number | undefined): Promise<IQuote[]> {
			throw new Error('Function not implemented.');
		}
	};

	beforeAll(() => {
		axiosMock = new MockAdapter(axiosInstance);
	});

	beforeEach(() => {
		jest.clearAllMocks();
		axiosMock.reset();
	});

	it('should create quotes and return carrier information', async () => {
		const mockResponseData = {
			dispatchers: [
				{
					offers: [
						{
							carrier: {
								name: 'UBER',
							},
							final_price: 60.74,
							service: 'Normal',
							delivery_time: {
								days: 6,
							}
						},
						{
							carrier: {
								name: 'CORREIOS',
							},
							final_price: 92.45,
							service: 'PAC',
							delivery_time: {
								days: 5,
							}
						},
					],
				},
			],
		};
		axiosMock.onPost('/quote/simulate').reply(200, mockResponseData);

		const shipping: Shipping = {
			recipient: {
				address: {
					zipcode: '01311000',
				},
			},
			volumes: [
				{
				   category: 7,
				   amount: 1,
				   unitary_weight: 5,
				   unitary_price: 349,
				   price: 349,
				   sku: 'abc-teste-123',
				   height: 0.2,
				   width: 0.2,
				   length: 0.2
				},
				{
				   category: 7,
				   amount: 2,
				   unitary_weight: 4,
				   unitary_price: 349,
				   price: 556,
				   sku: 'abc-teste-527',
				   height: 0.4,
				   width: 0.6,
				   length: 0.15
				}
			 ]
		};

		const result = await createQuote(mockQuoteRepository, shipping);

		expect(result).toHaveProperty('carrier');
		expect(result?.carrier).toHaveLength(4);
		expect(result?.carrier[0].name).toEqual('UBER'); 
	});

	it('should throw an error when the API call fails', async () => {
		axiosMock.onPost('/quote/simulate').reply(500);

		const shipping: Shipping = {
			recipient: {
				address: {
					zipcode: '01311000',
				},
			},
			volumes: [
				{
				   category: 7,
				   amount: 1,
				   unitary_weight: 5,
				   unitary_price: 349,
				   price: 349,
				   sku: 'abc-teste-123',
				   height: 0.2,
				   width: 0.2,
				   length: 0.2
				}
			]
		};

		await expect(createQuote(mockQuoteRepository, shipping)).rejects.toThrow(
			'Error when calling Frete Rápido API',
		);
	});

	it('should throw an unknown error when the API call returns an invalid response', async () => {
		axiosMock.onPost('/quote/simulate').reply(200, {});

		const shipping: Shipping = {
			recipient: {
				address: {
					zipcode: '01311000',
				},
			},
			volumes: [
				{
				   category: 7,
				   amount: 1,
				   unitary_weight: 5,
				   unitary_price: 349,
				   price: 349,
				   sku: 'abc-teste-123',
				   height: 0.2,
				   width: 0.2,
				   length: 0.2
				}
			]
		};

		await expect(createQuote(mockQuoteRepository, shipping)).rejects.toThrow(
			'Unknown error occurred',
		);
	});
});
