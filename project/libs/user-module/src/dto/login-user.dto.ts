import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
	@ApiProperty({
		description: 'Unique email of user',
		example: 'user@mail.ru'
	})
	@IsEmail()
	public email: string;

	@ApiProperty({
		description: 'password of user',
		example: '123456'
	})
	@IsString()
	public password: string;
}