import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@project/shared';
import { EmailSubscriberEntity } from './subscriber.entity';
import { EmailSubscriberModel } from './subscriber.model';
import { EmailSubscriberFactory } from './subscriber.factory';

@Injectable()
export class EmailSubscriberRepository extends BaseMongoRepository<EmailSubscriberEntity, EmailSubscriberModel> {
	constructor(
		entityFactory: EmailSubscriberFactory,
		@InjectModel(EmailSubscriberModel.name) emailSubscriberModel: Model<EmailSubscriberModel>
	) {
		super(entityFactory, emailSubscriberModel);
	}

	public async findByEmail(email: string): Promise<EmailSubscriberEntity | null> {
		const document = await this.model.findOne({ email }).exec();
		return this.createEntityFromDocument(document);
	}
}