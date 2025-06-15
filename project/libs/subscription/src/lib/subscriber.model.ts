import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EmailSubscriber } from './subscriber.interface';


@Schema({
	collection: 'email-subscribers',
	timestamps: true,
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
})
export class EmailSubscriberModel extends Document implements EmailSubscriber {
	public id?: string;

	@Prop({
		required: true,
	})
	public email: string;

	@Prop({
		required: true
	})
	public name: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);

EmailSubscriberSchema.virtual('id').get(function () {
	return this._id.toString();
});