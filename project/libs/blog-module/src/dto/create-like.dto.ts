import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsUUID } from "class-validator";

export class CreateLikeDto {
	@ApiProperty({
		description: 'ID of post',
		example: '629662c2-1459-4cee-92e4-40dd873cbd18'
	})
	@IsUUID()
	public postId: string;

	@ApiProperty({
		description: 'ID of user',
		example: '658170cbb954e9f5b905ccf4'
	})
	@IsMongoId()
	public userId: string;
}