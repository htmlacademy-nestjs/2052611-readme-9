import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SUBSCRIPTION_ADD_SUBSCRIBER } from './mail.constant';
import { EmailSubscriber } from './subscriber.interface';
import notifyConfig from './notify.config';

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) { }

	@Inject(notifyConfig.KEY)
	private readonly notifyConfig: ConfigType<typeof notifyConfig>

	public async sendNotifyNewSubscriber(subscriber: EmailSubscriber) {
		await this.mailerService.sendMail({
			from: this.notifyConfig.mail.from,
			to: subscriber.email,
			subject: SUBSCRIPTION_ADD_SUBSCRIBER,
			template: './add-subscriber',
			context: {
				user: `${subscriber.name}`,
				email: `${subscriber.email}`,
			}
		})
	}
}