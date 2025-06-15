import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared';
import { EmailSubscriber } from './subscriber.interface';
import { EmailSubscriberEntity } from './subscriber.entity';

@Injectable()
export class EmailSubscriberFactory implements EntityFactory<EmailSubscriberEntity> {
	public create(entityPlainData: EmailSubscriber): EmailSubscriberEntity {
		return new EmailSubscriberEntity(entityPlainData);
	}
}