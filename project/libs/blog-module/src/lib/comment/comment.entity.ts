import { Entity, StorableEntity } from "@project/shared/src/index";
import { Comment } from "./comment.interface";

export class CommentEntity extends Entity implements StorableEntity<Comment> {
	public userUuid: string;
	public postUuid: string;
	public text: string;
	public creationDate: Date;
	constructor(entity: Comment) {
		super();
		this.uuid = entity.uuid ?? '';
		this.userUuid = entity.userUuid;
		this.postUuid = entity.postUuid;
		this.text = entity.text;
		this.creationDate = entity.creationDate;
	}

	public toPOJO(): Comment {
		return {
			uuid: this.uuid,
			userUuid: this.userUuid,
			postUuid: this.postUuid,
			text: this.text,
			creationDate: this.creationDate
		}
	}
}