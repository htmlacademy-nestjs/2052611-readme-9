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
	@Type(() => TagRdo)
	public tags: TagRdo[];

	@Expose()
	@Type(() => CommentRdo)
	public comments: CommentRdo[];
}