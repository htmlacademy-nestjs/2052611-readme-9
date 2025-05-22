import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty({
		description: 'Unique email of user',
		example: 'user@mail.ru'
	})
	public email: string;

	@ApiProperty({
		description: 'Name of user',
		example: 'Bob'
	})
	public name: string;

	@ApiProperty({
		description: 'Path to avatar of user',
		example: '/images/Bob.jpg'
	})
	public image: string;

	@ApiProperty({
		description: 'password of user',
		example: '123456'
	})
	public password: string;
}