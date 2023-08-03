import { env } from '@config/env';
import { start } from '@infrastructure/webserver/server';
import { connect, close } from '@infrastructure/db/mongo/connection';

try {
	start();
	connect(env.databaseName);
} catch (err) {
	console.log(err);
	close();
	process.exit(1);
}
