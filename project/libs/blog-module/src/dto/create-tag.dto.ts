import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTagDto {
	@ApiProperty({
		description: "Unique name of tag",
		example: "Text"
	})
	@IsString()
	@IsAlphanumeric()
	@MinLength(3)
	@MaxLength(10)
	public name: string;
}