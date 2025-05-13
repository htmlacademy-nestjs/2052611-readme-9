import { BlogPost } from "./post.interface";
import { Entity, StorableEntity } from '@project/shared/src/index';

export class BlogPostEntity extends Entity implements StorableEntity<BlogPost> {
	public typeUuid: string;
	public userUuid: string;
	public creationDate: Date;
	public publicationDate: Date;
	public isPublished: boolean;
	public tags?: string[];
	public data: string;

	constructor(post: BlogPost) {
		super();
		this.uuid = post?.uuid ?? '';
		this.typeUuid = post.typeUuid;
		this.userUuid = post.userUuid;
		this.creationDate = post.creationDate;
		this.publicationDate = post.publicationDate;
		this.isPublished = post.isPublished;
		this.tags = post.tags ?? [];
		this.data = post.data;
	}

	public toPOJO(): BlogPost {
		return {
			uuid: this.uuid,
			typeUuid: this.typeUuid,
			userUuid: this.userUuid,
			creationDate: this.creationDate,
			publicationDate: this.publicationDate,
			isPublished: this.isPublished,
			tags: this.tags,
			data: this.data
		}
	}
}