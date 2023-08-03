import mongoose from 'mongoose';
import { env } from '@config/env';

export const connect = async (): Promise<void> => {
	mongoose
		.connect(env.databaseUrl, {
			dbName: env.databaseName,
		})
		.then(() => console.log('Connected to mongo database'));
};

export const close = (): Promise<void> => mongoose.connection
	.close();
