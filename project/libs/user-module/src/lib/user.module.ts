import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	controllers: [UserController],
	providers: [UserRepository, UserFactory, UserService],
	exports: [UserRepository],
	imports: [MongooseModule.forFeature([
		{ name: UserModel.name, schema: UserSchema }
	])],
})
export class UserModule { }