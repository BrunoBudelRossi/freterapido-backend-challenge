interface Address {
    zipcode: string;
}
  
interface Recipient {
    address: Address;
}

interface Volume {
    category: number;
    amount: number;
    unitary_weight: number;
    unitary_price: number;
    price: number;
    sku: string;
    height: number;
    width: number;
    length: number;
}
  
interface Shipping {
    recipient: Recipient;
    volumes: Volume[];
}
  