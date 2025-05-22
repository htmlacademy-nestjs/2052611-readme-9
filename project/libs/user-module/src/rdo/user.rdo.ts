import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserRdo {
	@ApiProperty({
		description: 'Unique ID of user',
		example: '4f76fa6f-ce5e-4a55-b749-beb370137846'
	})
	@Expose()
	public id: string;


	@ApiProperty({
		description: 'Unique email of user',
		example: 'user@mail.ru'
	})
	@Expose()
	public email: string;

	@ApiProperty({
		description: 'Name of user',
		example: 'Bob'
	})
	@Expose()
	public name: string;

	@ApiProperty({
		description: 'Path to avatar of user',
		example: '/images/Bob.jpg'
	})
	@Expose()
	public image: string;
}