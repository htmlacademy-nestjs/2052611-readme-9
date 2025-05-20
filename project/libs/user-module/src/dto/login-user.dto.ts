import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
	@ApiProperty({
		description: 'Unique email of user',
		example: 'user@mail.ru'
	})
	public email: string;

	@ApiProperty({
		description: 'password of user',
		example: '123456'
	})
	public password: string;
}