import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@project/shared';

@Schema({
	collection: 'users',
	timestamps: true,
})

export class UserModel extends Document implements User {
	@Prop({
		required: true,
		unique: true,
	})
	public email: string;

	@Prop({
		required: true,
	})
	public name: string;

	@Prop({
		required: true,
	})
	public passwordHash: string;

	@Prop()
	public image: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);