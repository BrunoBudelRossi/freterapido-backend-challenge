import express, { json, urlencoded } from 'express';
import router from '@interface/router';
import cors from 'cors';
import { env } from '@config/env';

export const app = express();

app.disable('x-powered-by');

const corsOptions: cors.CorsOptions = {
	origin: '*',
	methods: 'GET,PUT,POST,DELETE',
	allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', router);

export const start = () => {
	app.listen(env.port, () => {
		console.log(`Server running on port ${env.port}`);
	});
};
