import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class LoggedUserRdo {
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
		description: 'Access token'
	})
	@Expose()
	public accessToken: string;

	@ApiProperty({
		description: 'Refresh token',
	})
	@Expose()
	public refreshToken: string;
}