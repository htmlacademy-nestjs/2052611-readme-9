import { Entity, StorableEntity } from "@project/shared";
import { Comment } from "./comment.interface";

export class CommentEntity extends Entity implements StorableEntity<Comment> {
	public userId: string;
	public postId: string;
	public text: string;
	public creationDate: Date;
	constructor(entity: Comment) {
		super();
		this.id = entity.id ?? '';
		this.userId = entity.userId;
		this.postId = entity.postId;
		this.text = entity.text;
		this.creationDate = entity.creationDate;
	}

	public toPOJO(): Comment {
		return {
			id: this.id,
			userId: this.userId,
			postId: this.postId,
			text: this.text,
			creationDate: this.creationDate
		}
	}
}