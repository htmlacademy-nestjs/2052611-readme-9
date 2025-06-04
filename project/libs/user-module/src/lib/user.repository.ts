import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/shared';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
	constructor(
		entityFactory: UserFactory,
		@InjectModel(UserModel.name) model: Model<UserModel>
	) {
		super(entityFactory, model);
	}

	public async findByEmail(email: string): Promise<UserEntity | null> {
		const document = await this.model.findOne({ email }).exec();
		return this.createEntityFromDocument(document);
	}
}