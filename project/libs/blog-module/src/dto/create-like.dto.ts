import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class CreateLikeDto {
	@ApiProperty({
		description: 'ID of user',
		example: '658170cbb954e9f5b905ccf4'
	})
	@IsMongoId()
	public userId: string;
}