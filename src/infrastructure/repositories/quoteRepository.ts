import IQuoteRepository from "domain/quote/IQuoteRepository";
import Quote from "domain/quote/IQuote";
class QuoteRepository implements IQuoteRepository {
    async create(quote: Quote): Promise<any> {
        // salva no banco
        return {};
    }
}

export default new QuoteRepository();
