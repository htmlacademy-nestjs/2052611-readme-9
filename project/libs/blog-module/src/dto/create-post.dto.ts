import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsBoolean, IsISO8601, IsMongoId, IsObject, IsOptional, IsString, IsUrl, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
	@ApiProperty({
		description: "ID of post's type",
		example: "076f46b1-f778-4f05-93df-e5b10ab6146e"
	})
	@IsUUID()
	public typeId: string;

	@ApiProperty({
		description: 'ID of user',
		example: '658170cbb954e9f5b905ccf4'
	})
	@IsMongoId()
	public userId: string;

	@ApiProperty({
		description: 'Date of creation'
	})
	@IsISO8601()
	public createdAt: Date;

	@ApiProperty({
		description: 'Date of publication'
	})
	@IsISO8601()
	public updatedAt: Date;

	@ApiProperty({
		description: 'Status of publication',
		example: "true"
	})
	@IsBoolean()
	public isPublished: boolean;

	@ApiProperty({
		description: "Array of tag's IDs",
		example: "['f733b017-cc04-4dfc-909d-debecf7b418d']"
	})
	@IsArray()
	@ArrayNotEmpty()
	@IsUUID('all', { each: true })
	public tags?: string[];

	@ApiProperty({
		description: "Title (for 'text' and 'video' post types)",
		example: "Post's title"
	})
	@IsString()
	@IsOptional()
	@MinLength(20)
	@MaxLength(50)
	public title?: string;

	@ApiProperty({
		description: "Url (for 'video' and 'link' post types)",
		example: "Post's title"
	})
	@IsUrl()
	@IsOptional()
	public url?: string;

	@ApiProperty({
		description: "Preview (for 'text' post type)",
		example: "Post's preview"
	})
	@IsString()
	@IsOptional()
	@MinLength(50)
	@MaxLength(255)
	public preview?: string;

	@ApiProperty({
		description: "Text (for 'text' post type)",
		example: "Post's full text"
	})
	@IsString()
	@IsOptional()
	@MinLength(100)
	@MaxLength(1024)
	public text?: string;

	@ApiProperty({
		description: "Quote's text (for 'quote' post type)",
		example: "Quote's text"
	})
	@IsString()
	@IsOptional()
	@MinLength(20)
	@MaxLength(300)
	public quote?: string;

	@ApiProperty({
		description: "Quote's author (for 'quote' post type)",
		example: "Quote's author"
	})
	@IsString()
	@IsOptional()
	@MinLength(3)
	@MaxLength(50)
	public author?: string;

	@ApiProperty({
		description: "File (for 'photo' post type)",
		example: "File"
	})
	@IsString()
	@IsOptional()
	public file?: string;

	@ApiProperty({
		description: "Link's description (for 'link' post type)",
		example: "Link's description"
	})
	@IsString()
	@IsOptional()
	@MaxLength(300)
	public description?: string;

	@ApiProperty({
		description: "ID or original post (for 'repost' post type)",
		example: "076f46b1-f778-4f05-93df-e5b10ab6146e"
	})
	public originalPostId?: string;
}