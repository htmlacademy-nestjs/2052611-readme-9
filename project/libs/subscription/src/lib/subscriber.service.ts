import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './subscriber.repository';
import { CreateEmailSubscriberDto } from '../dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './subscriber.entity';

@Injectable()
export class EmailSubscriberService {
	constructor(
		private readonly emailSubscriberRepository: EmailSubscriberRepository
	) { }

	public async addSubscriber(subscriber: CreateEmailSubscriberDto) {
		const { email } = subscriber;
		const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

		if (existsSubscriber) {
			return existsSubscriber;
		}

		const emailSubscriber = new EmailSubscriberEntity(subscriber);
		await this.emailSubscriberRepository.save(emailSubscriber);

		return emailSubscriber;
	}
}