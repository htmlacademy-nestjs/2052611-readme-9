import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { AUTH_EMAIL_NOT_VALID } from "../lib/user/user.constant";

export class CreateUserDto {
	@ApiProperty({
		description: 'Unique email of user',
		example: 'user@mail.ru'
	})
	@IsEmail({}, { message: AUTH_EMAIL_NOT_VALID })
	public email: string;

	@ApiProperty({
		description: 'Name of user',
		example: 'Bob'
	})
	@IsString()
	public name: string;

	@ApiProperty({
		description: 'Path to avatar of user',
		example: '/images/Bob.jpg'
	})
	@IsString()
	public image: string;

	@ApiProperty({
		description: 'password of user',
		example: '123456'
	})
	@IsString()
	public password: string;
}