import { BlogPost } from "./post.interface";
import { Entity, StorableEntity } from '@project/shared';

export class BlogPostEntity extends Entity implements StorableEntity<BlogPost> {
	public typeId: string;
	public userId: string;
	public createdAt: Date;
	public updatedAt: Date;
	public isPublished: boolean;
	public tags?: string[];
	public title?: string;
	public url?: string;
	public preview?: string;
	public text?: string;
	public quote?: string;
	public author?: string;
	public file?: string;
	public description?: string;
	public originalPostId?: string;

	constructor(post: BlogPost) {
		super();
		this.id = post?.id ?? '';
		this.typeId = post.typeId;
		this.userId = post.userId;
		this.createdAt = post.createdAt;
		this.updatedAt = post.updatedAt;
		this.isPublished = post.isPublished;
		this.tags = post.tags ?? [];
		this.title = post.title;
		this.url = post.url;
		this.preview = post.preview;
		this.text = post.text;
		this.quote = post.quote;
		this.author = post.author;
		this.file = post.file;
		this.description = post.description;
		this.originalPostId = post.originalPostId;
	}

	public toPOJO(): BlogPost {
		return {
			id: this.id,
			typeId: this.typeId,
			userId: this.userId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			isPublished: this.isPublished,
			tags: this.tags,
			title: this.title,
			url: this.url,
			preview: this.preview,
			text: this.text,
			quote: this.quote,
			author: this.author,
			file: this.file,
			description: this.description,
			originalPostId: this.originalPostId
		}
	}
}