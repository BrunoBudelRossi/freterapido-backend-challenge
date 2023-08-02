import { IQuote, IQuoteByName } from 'domain/quote/IQuote';
import IQuoteRepository from 'domain/quote/IQuoteRepository';

export default async (
	quoteRepository: IQuoteRepository,
	lastQuotes?: number,
) => {
	const quotes = await quoteRepository.find(lastQuotes);

	const quotesByName = quotes.reduce((acc: IQuoteByName[], quote: IQuote) => {
		const quoteByName = acc.find((item: IQuoteByName) => item.name === quote.name);

		if (quoteByName) {
			quoteByName.name = quote.name;
			quoteByName.amount += 1;
			quoteByName.totalPrice += quote.price;
			quoteByName.priceAvg = Math.round(quoteByName.totalPrice / quoteByName.amount);
		} else {
			acc.push({
				name: quote.name,
				amount: 1,
				totalPrice: quote.price,
				priceAvg: quote.price,
			});

			return acc;
		}

		const otherQuotes = acc.filter((item: IQuoteByName) => item.name !== quote.name);

		return [...otherQuotes, quoteByName];
	}, []);

	let moreExpensiveShipping: IQuote = {
		name: '',
		service: '',
		deadline: '',
		price: 0,
	};
	let cheapestShipping: IQuote = {
		name: '',
		service: '',
		deadline: '',
		price: 0,
	};

	quotes.forEach((quote: IQuote) => {
		if (moreExpensiveShipping.name === '' || quote.price > moreExpensiveShipping.price) {
			moreExpensiveShipping = quote;
		}

		if (cheapestShipping.name === '' || quote.price < cheapestShipping.price) {
			cheapestShipping = quote;
		}
	});

	return {
		moreExpensiveShipping,
		cheapestShipping,
		carrier: quotesByName,
	};
};
