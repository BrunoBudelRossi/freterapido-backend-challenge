import axios, { AxiosInstance } from 'axios';
import { env } from '@config/env';

const instance: AxiosInstance = axios.create({
	baseURL: env.apiUrl,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default instance;
