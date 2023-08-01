interface Address {
    zipcode: string;
}

interface Recipient {
    address: Address;
}

export interface Volume {
    category: number | string;
    amount: number;
    unitary_weight: number;
    unitary_price: number;
    price: number;
    sku: string;
    height: number;
    width: number;
    length: number;
}

export interface Shipping {
    recipient: Recipient;
    volumes: Volume[];
}
