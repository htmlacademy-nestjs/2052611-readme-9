import { getMongoConnectionString } from '@project/shared';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
	return {
		useFactory: async (config: ConfigService) => {
			return {
				uri: getMongoConnectionString(config.get<string>('db.user'),
					config.get<string>('db.password'),
					config.get<string>('db.host'),
					config.get<string>('db.port'),
					config.get<string>('db.name'),
					config.get<string>('db.authBase'),
				)
			}
		},
		inject: [ConfigService]
	}
}