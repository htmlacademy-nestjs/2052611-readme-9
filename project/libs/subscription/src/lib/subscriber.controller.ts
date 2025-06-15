import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { EmailSubscriberService } from './subscriber.service';
import { CreateEmailSubscriberDto } from '../dto/create-subscriber.dto';
import { RabbitRouting } from '@project/shared';
import { MailService } from './mail.service';

@Controller()
export class EmailSubscriberController {
	constructor(
		private readonly subscriberService: EmailSubscriberService,
		private readonly mailService: MailService,
	) { }

	@RabbitSubscribe({
		exchange: 'notify',
		routingKey: RabbitRouting.AddSubscriber,
		queue: 'notify.income',
	})
	public async create(subscriber: CreateEmailSubscriberDto) {
		await this.subscriberService.addSubscriber(subscriber);
		await this.mailService.sendNotifyNewSubscriber(subscriber);
	}
}