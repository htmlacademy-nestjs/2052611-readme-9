import { Expose, Type } from "class-transformer";
import { PostTypeRdo } from "./post-type.rdo";
import { CommentRdo } from "./comment.rdo";
import { TagRdo } from "./tag.rdo";
import { RepostRdo } from "./repost.rdo";
import { OriginalPostRdo } from "./original-post.rdo";
import { ApiProperty } from "@nestjs/swagger";

export class BlogPostRdo {
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
	public isPublished: boolean;

	@ApiProperty()
	@Expose()
	public createdAt: Date;

	@ApiProperty()
	@Expose()
	public updatedAt: Date;

	@ApiProperty()
	@Expose()
	@Type(() => PostTypeRdo)
	public postType: PostTypeRdo;

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

	@ApiProperty({
		type: [TagRdo]
	})
	@Expose()
	@Type(() => TagRdo)
	public tags: TagRdo[];

	@ApiProperty()
	@Expose()
	public numberOfComments: number;

	@ApiProperty()
	@Expose()
	public numberOfLikes: number;

	@ApiProperty({
		type: [RepostRdo]
	})
	@Expose()
	@Type(() => RepostRdo)
	public reposts: RepostRdo[];

	@ApiProperty({
		nullable: true
	})
	@Expose()
	@Type(() => OriginalPostRdo)
	public originalPost?: OriginalPostRdo;
}