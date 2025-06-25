import { IsEmail, IsNotEmpty } from 'class-validator';
import { SubscriptionErrorMessage } from '../lib/subscriber.constant';

export class CreateEmailSubscriberDto {
	@IsEmail({}, { message: SubscriptionErrorMessage.EmailNotValid })
	public email: string;

	@IsNotEmpty({ message: SubscriptionErrorMessage.NameIsEmpty })
	public name: string;
}