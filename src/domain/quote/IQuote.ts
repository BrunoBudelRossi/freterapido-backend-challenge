export interface IQuote {
    name: string;
    service: string;
    deadline: number;
    price: number;
}

export interface IQuoteByName {
	name: string;
	amount: number;
	totalPrice: number;
	priceAvg: number;
}
