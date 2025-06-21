import { Expose, Type } from "class-transformer";
import { PostTypeRdo } from "./post-type.rdo";
import { CommentRdo } from "./comment.rdo";
import { TagRdo } from "./tag.rdo";

export class BlogPostRdo {
	@Expose()
	public id: string;

	@Expose()
	public userId: string;

	@Expose()
	public createdAt: Date;

	@Expose()
	public updatedAt: Date;

	@Expose()
	@Type(() => PostTypeRdo)
	public postType: PostTypeRdo;

	@Expose()
	public author?: string;

	@Expose()
	public description?: string;

	@Expose()
	public file?: string;

	@Expose()
	public originalPostId?: string;

	@Expose()
	public preview?: string;

	@Expose()
	public quote?: string;

	@Expose()
	public text?: string;

	@Expose()
	public title?: string;

	@Expose()
	public url?: string;

	@Expose()
	@Type(() => TagRdo)
	public tags: TagRdo[];

	@Expose()
	@Type(() => CommentRdo)
	public comments: CommentRdo[];

	@Expose()
	public likes: number;
}