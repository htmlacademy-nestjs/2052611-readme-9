import { ApiProperty } from '@nestjs/swagger';

export class CreatePostTypeDto {
	@ApiProperty({
		description: "Unique name of the post's type",
		example: "Text"
	})
	public name: string;
}