import dotenv from 'dotenv';

dotenv.config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

export const env = {
	port: process.env.PORT ?? 3000,
	databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/quotes',
	databaseName: process.env.DATABASE_NAME || 'quotes',
	apiUrl: process.env.API_URL,
	freteRapidoRegisteredNumber: process.env.FRETE_RAPIDO_REGISTERED_NUMBER,
	freteRapidoToken: process.env.FRETE_RAPIDO_TOKEN,
	freteRapidoPlatformCode: process.env.FRETE_RAPIDO_PLATAFORM_CODE,
	freteRapidoZipcode: Number(process.env.FRETE_RAPIDO_ZIPCODE),
};
