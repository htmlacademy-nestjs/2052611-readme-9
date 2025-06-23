import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateCommentDto {
	@ApiProperty({
		description: 'ID of user',
		example: '658170cbb954e9f5b905ccf4'
	})
	@IsMongoId()
	public userId: string;

	@ApiProperty({
		description: 'Text of comment',
		example: 'Some text'
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(300)
	public text: string;
}