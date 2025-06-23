import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class RepostRdo {
	@ApiProperty({
		type: 'string',
		format: 'uuid'
	})
	@Expose()
	public id: string;

	@ApiProperty({
		example: '658170cbb954e9f5b905ccf4'
	})
	@Expose()
	public userId: string;

	@ApiProperty()
	@Expose()
	public createdAt: Date;

	@ApiProperty()
	@Expose()
	public updatedAt: Date;
}