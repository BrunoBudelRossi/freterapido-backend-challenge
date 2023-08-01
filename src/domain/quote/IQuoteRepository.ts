export default interface IQuoteRepository {
    create: (quote: Quote) => Promise<any>;
    // get: (quoteId: string) => Promise<Quote>;
}