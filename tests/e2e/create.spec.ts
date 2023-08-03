import axios from 'axios'

describe('createQuote e2e', () => {
    it('should correctly call create endpoint and return carrier information', async () => {
        const response = await axios.post('http://localhost:3000/api/quote', {
            recipient: {
                address: {
                    zipcode: '01311000'
                }
            },
            volumes: [
                {
                    category: 7,
                    amount: 1,
                    unitary_weight: 5,
                    price: 349,
                    sku: 'abc-teste-123',
                    height: 0.2,
                    width: 0.2,
                    length: 0.2
                },
                {
                    category: 7,
                    amount: 2,
                    unitary_weight: 4,
                    price: 556,
                    sku: 'abc-teste-527',
                    height: 0.4,
                    width: 0.6,
                    length: 0.15
                }
            ]
        })

        expect(response.status).toBe(201);
        expect(response.data.payload).toHaveProperty('carrier');
    })
       
})
