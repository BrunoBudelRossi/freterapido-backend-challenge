import MockAdapter from 'axios-mock-adapter';
import { Shipping } from 'domain/shipping/IShipping';
// import createQuote from 'application/use_cases/createQuote';
import createQuote from '../../src/application/use_cases/createQuote';
import QuoteRepository from 'infrastructure/repositories/quoteRepository';
import axiosInstance from 'infrastructure/gateway/axiosClient';

describe('createQuote', () => {
	// let quoteRepository: IQuoteRepository;
	let axiosMock: MockAdapter;

	beforeAll(() => {
		axiosMock = new MockAdapter(axiosInstance);
	});

	beforeEach(() => {
		jest.clearAllMocks(); // Clear all mocks before each test
	});

	it('should create quotes and return carrier information', async () => {
		// Mock the Axios response for the /quote/simulate API call
		const mockResponseData = {
			status: 200,
			data: {
				dispatchers: [
					{
						offers: [
							{
								carrier: {
									reference: 1647,
									name: 'UBER',
								},
								final_price: 60.74,
								service: 'Normal',
							},
							// Add more mocked offers if needed
						],
					},
				],
			},
		};
		axiosMock.onPost('/quote/simulate').reply(200, mockResponseData);

		// Create a sample shipping object for the test
		const shipping: Shipping = {
			recipient: {
				address: {
					zipcode: '01311000',
				},
			},
			volumes: [
				{
					category: 1,
					amount: 1,
					unitary_weight: 1,
					unitary_price: 100,
					price: 100,
					sku: 'abc-teste-123',
					height: 0.2,
					width: 0.2,
					length: 0.2,
				},
			],
		};

		// Call the createQuote function with the mocked data
		const result = await createQuote(QuoteRepository, shipping);

		// Expectations
		expect(result).toHaveProperty('carrier');
		expect(QuoteRepository.create).toHaveBeenCalledTimes(1);
		expect(QuoteRepository.create).toHaveBeenCalledWith([
			{
				name: 'UBER',
				service: 'Normal',
				deadline: 1647,
				price: 60.74,
			},
		]);
	});

	it('should throw an error when the API call fails', async () => {
		// Mock the Axios response for the /quote/simulate API call to return an error
		axiosMock.onPost('/quote/simulate').reply(500);

		// Create a sample shipping object for the test
		const shipping: Shipping = {
			recipient: {
				address: {
					zipcode: '01311000',
				},
			},
			volumes: [
				{
					category: 1,
					amount: 1,
					unitary_weight: 1,
					unitary_price: 100,
					price: 100,
					sku: 'abc-teste-123',
					height: 0.2,
					width: 0.2,
					length: 0.2,
				},
			],
		};

		// Call the createQuote function and expect it to throw an error
		await expect(createQuote(QuoteRepository, shipping)).rejects.toThrow(
			'Error when calling Frete Rápido API',
		);
	});
});
