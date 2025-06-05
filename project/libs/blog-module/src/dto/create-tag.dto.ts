import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTagDto {
	@ApiProperty({
		description: "Unique name of tag",
		example: "Text"
	})
	@IsString()
	public name: string;
}