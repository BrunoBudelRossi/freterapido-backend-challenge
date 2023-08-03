/* eslint-disable consistent-return */
import { IQuote } from '@domain/quote/IQuote';
import IQuoteRepository from '@domain/quote/IQuoteRepository';
import {
	Volume, Shipping, Dispatcher, Offer,
} from '@domain/shipping/IShipping';
import axiosInstance from '@infrastructure/gateway/axiosClient';
import { env } from '@config/env';
import { isAxiosError } from 'axios';

export default async (
	quoteRepository: IQuoteRepository,
	shipping: Shipping,
) => {
	try {
		const zipcode = parseInt(shipping.recipient.address.zipcode, 10);

		const response = await axiosInstance.post('/quote/simulate', {
			shipper: {
				registered_number: env.freteRapidoRegisteredNumber,
				token: env.freteRapidoToken,
				platform_code: env.freteRapidoPlatformCode,
			},
			recipient: {
				type: 1,
				country: 'BRA',
				zipcode,
			},
			dispatchers: [
				{
					registered_number: env.freteRapidoRegisteredNumber,
					zipcode: env.freteRapidoZipcode,
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

			const quotes = data.dispatchers.reduce((acc: IQuote[], item: Dispatcher) => {
				item.offers.forEach((offer: Offer) => {
					const quote: IQuote = {
						name: '',
						service: '',
						deadline: 0,
						price: 0,
					};
					quote.deadline = offer.delivery_time.days;
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
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			throw new Error(`Error when calling Frete Rápido API: ${error.message}`);
		} else {
			throw new Error('Unknown error occurred');
		}
	}
};
