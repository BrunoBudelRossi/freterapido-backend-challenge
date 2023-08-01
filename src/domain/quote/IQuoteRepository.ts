/* eslint-disable no-unused-vars */
import IQuote from 'domain/quote/IQuote';

export default interface IQuoteRepository {
    create: (quotes: IQuote[]) => Promise<IQuote[]>;
    find: (lastQuotes?: number) => Promise<IQuote[]>;
}
