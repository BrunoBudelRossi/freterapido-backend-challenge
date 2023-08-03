import axios from 'axios'
import { IQuoteByName } from '../../src/domain/quote/IQuote';

describe('getQuote e2e', () => {
    it('should correctly call get endpoint and return metrics information', async () => {
        const response = await axios.get('http://localhost:3000/api/metrics',)

        expect(response.status).toBe(200);
        expect(response.data.payload).toHaveProperty('carrier');
        expect(response.data.payload).toHaveProperty('moreExpensiveShipping');
        expect(response.data.payload).toHaveProperty('cheapestShipping');
    })
    
    it('should correctly call get endpoint with last_quotes query params and return metrics information', async () => {
        const lastQuotes = 2;
        const response = await axios.get(`http://localhost:3000/api/metrics?last_quotes=${lastQuotes}`)

        let usedRecords = 0;
        response.data.payload.carrier.forEach((item: IQuoteByName) => {
            usedRecords += item.amount;
        });

        expect(response.status).toBe(200);
        expect(response.data.payload).toHaveProperty('moreExpensiveShipping');
        expect(response.data.payload).toHaveProperty('cheapestShipping');
        expect(usedRecords).toEqual(lastQuotes);

    })
})
