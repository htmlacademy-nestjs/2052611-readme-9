import { IsEmail, IsNotEmpty } from 'class-validator';
import { SUBSCRIPTION_EMAIL_NOT_VALID, SUBSCRIPTION_NAME_IS_EMPTY } from '../lib/subscriber.constant';

export class CreateEmailSubscriberDto {
	@IsEmail({}, { message: SUBSCRIPTION_EMAIL_NOT_VALID })
	public email: string;

	@IsNotEmpty({ message: SUBSCRIPTION_NAME_IS_EMPTY })
	public name: string;
}