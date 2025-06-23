import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class OriginalPostRdo {
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

	@ApiProperty()
	@Expose()
	public author?: string;

	@ApiProperty()
	@Expose()
	public description?: string;

	@ApiProperty()
	@Expose()
	public file?: string;

	@ApiProperty()
	@Expose()
	public preview?: string;

	@ApiProperty()
	@Expose()
	public quote?: string;

	@ApiProperty()
	@Expose()
	public text?: string;

	@ApiProperty()
	@Expose()
	public title?: string;

	@ApiProperty()
	@Expose()
	public url?: string;
}