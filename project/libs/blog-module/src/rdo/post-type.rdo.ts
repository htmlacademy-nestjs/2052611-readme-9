import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class PostTypeRdo {
	@ApiProperty({
		type: 'string',
		format: 'uuid'
	})
	@Expose()
	public id: string;

	@ApiProperty()
	@Expose()
	public name: string;
}