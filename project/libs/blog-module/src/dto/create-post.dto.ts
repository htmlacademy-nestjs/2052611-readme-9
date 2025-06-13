import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsBoolean, IsDefined, IsEnum, IsISO8601, IsMongoId, IsObject, IsOptional, IsString, IsUrl, IsUUID, MaxLength, MinLength, ValidateIf } from "class-validator";
import { PostTypeUUID } from "../lib/post-type/post-type.constant";

export class CreatePostDto {
	@ApiProperty({
		description: "ID of post's type",
		example: "076f46b1-f778-4f05-93df-e5b10ab6146e",
		enum: PostTypeUUID
	})
	@IsEnum(PostTypeUUID)
	public typeId: PostTypeUUID;

	@ApiProperty({
		description: 'ID of user',
		example: '658170cbb954e9f5b905ccf4'
	})
	@IsMongoId()
	public userId: string;

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
	@IsOptional()
	@IsArray()
	@ArrayNotEmpty()
	@IsUUID('all', { each: true })
	public tags?: string[];

	@ApiProperty({
		description: "Title (for 'text' and 'video' post types)",
		example: "Post's title"
	})
	@ValidateIf(obj => obj.typeId === PostTypeUUID.Text || obj.typeId === PostTypeUUID.Video)
	@IsDefined()
	@IsString()
	@MinLength(20)
	@MaxLength(50)
	public title?: string;

	@ApiProperty({
		description: "Url (for 'video' and 'link' post types)",
		example: "Post's title"
	})
	@IsUrl()
	@ValidateIf(obj => obj.typeId === PostTypeUUID.Link || obj.typeId === PostTypeUUID.Video)
	@IsDefined()
	public url?: string;

	@ApiProperty({
		description: "Preview (for 'text' post type)",
		example: "Post's preview"
	})
	@ValidateIf(obj => obj.typeId === PostTypeUUID.Text)
	@IsDefined()
	@IsString()
	@MinLength(50)
	@MaxLength(255)
	public preview?: string;

	@ApiProperty({
		description: "Text (for 'text' post type)",
		example: "Post's full text"
	})
	@ValidateIf(obj => obj.typeId === PostTypeUUID.Text)
	@IsDefined()
	@IsString()
	@MinLength(100)
	@MaxLength(1024)
	public text?: string;

	@ApiProperty({
		description: "Quote's text (for 'quote' post type)",
		example: "Quote's text"
	})
	@ValidateIf(obj => obj.typeId === PostTypeUUID.Quote)
	@IsDefined()
	@IsString()
	@MinLength(20)
	@MaxLength(300)
	public quote?: string;

	@ApiProperty({
		description: "Quote's author (for 'quote' post type)",
		example: "Quote's author"
	})
	@ValidateIf(obj => obj.typeId === PostTypeUUID.Quote)
	@IsDefined()
	@IsString()
	@MinLength(3)
	@MaxLength(50)
	public author?: string;

	@ApiProperty({
		description: "File (for 'photo' post type)",
		example: "File"
	})
	@ValidateIf(obj => obj.typeId === PostTypeUUID.Photo)
	@IsDefined()
	@IsString()
	public file?: string;

	@ApiProperty({
		description: "Link's description (for 'link' post type)",
		example: "Link's description"
	})
	@ValidateIf(obj => obj.typeId === PostTypeUUID.Quote)
	@IsOptional()
	@IsString()
	@MaxLength(300)
	public description?: string;

	@ApiProperty({
		description: "ID or original post (for 'repost' post type)",
		example: "076f46b1-f778-4f05-93df-e5b10ab6146e"
	})
	@ValidateIf(obj => obj.typeId === PostTypeUUID.Repost)
	@IsDefined()
	@IsUUID()
	public originalPostId?: string;
}