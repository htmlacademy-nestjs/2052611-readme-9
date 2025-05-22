import { BlogPost } from "./post.interface";
import { Entity, StorableEntity } from '@project/shared/src/index';

export class BlogPostEntity extends Entity implements StorableEntity<BlogPost> {
	public typeId: string;
	public userId: string;
	public creationDate: Date;
	public publicationDate: Date;
	public isPublished: boolean;
	public tags?: string[];
	public data: string;

	constructor(post: BlogPost) {
		super();
		this.id = post?.id ?? '';
		this.typeId = post.typeId;
		this.userId = post.userId;
		this.creationDate = post.creationDate;
		this.publicationDate = post.publicationDate;
		this.isPublished = post.isPublished;
		this.tags = post.tags ?? [];
		this.data = post.data;
	}

	public toPOJO(): BlogPost {
		return {
			id: this.id,
			typeId: this.typeId,
			userId: this.userId,
			creationDate: this.creationDate,
			publicationDate: this.publicationDate,
			isPublished: this.isPublished,
			tags: this.tags,
			data: this.data
		}
	}
}