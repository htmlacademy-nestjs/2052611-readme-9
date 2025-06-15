import { Entity, StorableEntity } from '@project/shared';
import { EmailSubscriber } from './subscriber.interface';

export class EmailSubscriberEntity extends Entity implements StorableEntity<EmailSubscriber> {
	public email: string;
	public name: string;

	constructor(subscriber?: EmailSubscriber) {
		super();
		this.populate(subscriber);
	}

	public populate(subscriber?: EmailSubscriber): void {
		if (!subscriber) {
			return;
		}

		this.id = subscriber.id ?? '';
		this.email = subscriber.email;
		this.name = subscriber.name;
	}

	public toPOJO(): EmailSubscriber {
		return {
			id: this.id,
			email: this.email,
			name: this.name
		}
	}
}