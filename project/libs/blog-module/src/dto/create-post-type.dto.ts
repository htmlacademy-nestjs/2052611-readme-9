import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostTypeDto {
	@ApiProperty({
		description: "Unique name of the post's type",
		example: "Text"
	})
	@IsString()
	public name: string;
}