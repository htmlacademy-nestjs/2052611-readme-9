import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import applicationConfig from './app.config';
import mongoConfig from './mongo.config';

const ENV_USER_FILE_PATH = './user.env';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			load: [applicationConfig, mongoConfig],
			envFilePath: ENV_USER_FILE_PATH
		})
	]
})
export class UserConfigModule { }