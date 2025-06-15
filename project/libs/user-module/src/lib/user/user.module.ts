import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '../user-config/jwt.options';
import { JwtAccessStrategy } from '../user-config/jwt.strategy';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/shared';

@Module({
	controllers: [UserController],
	providers: [UserRepository, UserFactory, UserService, JwtAccessStrategy],
	exports: [UserRepository],
	imports: [MongooseModule.forFeature([
		{ name: UserModel.name, schema: UserSchema }
	]),
	JwtModule.registerAsync({
		inject: [ConfigService],
		useFactory: getJwtOptions,
	}),
	RabbitMQModule.forRootAsync(
		getRabbitMQOptions('rabbit')
	)

	],
})
export class UserModule { }