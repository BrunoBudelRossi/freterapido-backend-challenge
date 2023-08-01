import IQuote from 'domain/quote/IQuote';
import IQuoteRepository from 'domain/quote/IQuoteRepository';
import { Volume, Shipping } from 'domain/shipping/IShipping';
import axiosInstance from 'infrastructure/gateway/axiosClient';

export default async (
	quoteRepository: IQuoteRepository,
	shipping: Shipping,
) => {
	const zipcode = parseInt(shipping.recipient.address.zipcode, 10);

	const response = await axiosInstance.post('/quote/simulate', {
		shipper: {
			registered_number: '25438296000158',
			token: '1d52a9b6b78cf07b08586152459a5c90',
			platform_code: '5AKVkHqCn',
		},
		recipient: {
			type: 1,
			country: 'BRA',
			zipcode,
		},
		dispatchers: [
			{
				registered_number: '25438296000158',
				zipcode: 29161376,
				volumes: shipping.volumes.map((volume: Volume) => {
					volume.unitary_price = volume.price;
					volume.category = volume.category.toString();
					return volume;
				}),
			},
		],
		simulation_type: [0],
	});

	if (response.status === 200) {
		const { data } = response;

		const quotes = data.dispatchers.reduce((acc: IQuote[], item: any) => {
			item.offers.forEach((offer: any) => {
				const quote: IQuote = {
					name: '',
					service: '',
					deadline: '',
					price: 0,
				};
				quote.deadline = offer.carrier.reference;
				quote.price = offer.final_price;
				quote.name = offer.carrier.name;
				quote.service = offer.service;

				acc.push(quote);
			});

			return acc;
		}, []);

		const result = await quoteRepository.create(quotes);

		return {
			carrier: result,
		};
	}
	throw new Error('Error when calling Frete Rápido API');
};
