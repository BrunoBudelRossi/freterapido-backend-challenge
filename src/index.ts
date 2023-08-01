import { start } from './infrastructure/webserver/server';
import { connect, close } from './infrastructure/db/mongo/connection';

try {
	start();
	connect();
} catch (err) {
	console.log(err);
	close();
	process.exit(1);
}
