import { Entity, StorableEntity } from "@project/shared/src/index";
import { Like } from "./like.interface";

export class LikeEntity extends Entity implements StorableEntity<Like> {
	public userId: string;
	public postId: string;
	constructor(entity: Like) {
		super();
		this.id = entity.id ?? '';
		this.userId = entity.userId;
		this.postId = entity.postId;
	}

	public toPOJO(): Like {
		return {
			id: this.id,
			userId: this.userId,
			postId: this.postId
		}
	}
}