export interface IQuote {
    name: string;
    service: string;
    deadline: string;
    price: number;
}

export interface IQuoteByName {
	name: string;
	amount: number;
	totalPrice: number;
	priceAvg: number;
}
