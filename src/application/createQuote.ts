import IQuoteRepository from "domain/quote/IQuoteRepository";
import axiosInstance from 'infrastructure/gateway/axiosClient'

export default async (
    quoteRepository: IQuoteRepository,
    shipping: Shipping
) =>  {
    // verificar zip code de outros
    const response = await axiosInstance.post('', {
        shipper: {
            'registered_number': '25438296000158',
            'token': '1d52a9b6b78cf07b08586152459a5c90',
            'platform_code': '5AKVkHqCn',
        },
        recipient: {
            'type': 1,
            'country': 'BRA',
            'zipcode': shipping.recipient.address.zipcode,
        },
        dispatchers: {
            'registered_number': '25438296000158',
            'zipcode': 29161376,
            'volumes': shipping.volumes.map(volume => {
                volume['unitary_price'] = volume.price
                return volume
            }),
        },
        simulation_type: [0],
    })

    console.log(response);
    

    // pega o resultado e chama o repo para salvar
};
