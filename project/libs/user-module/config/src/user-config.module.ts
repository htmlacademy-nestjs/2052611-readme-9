import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

const ENV_USER_FILE_PATH = './user.env';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			load: [],
			envFilePath: ENV_USER_FILE_PATH
		})
	]
})
export class UserConfigModule { }