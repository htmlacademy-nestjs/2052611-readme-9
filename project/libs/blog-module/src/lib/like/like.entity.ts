import { Entity, StorableEntity } from "@project/shared/src/index";
import { Like } from "./like.interface";

export class LikeEntity extends Entity implements StorableEntity<Like> {
	public userUuid: string;
	public postUuid: string;
	constructor(entity: Like) {
		super();
		this.uuid = entity.uuid ?? '';
		this.userUuid = entity.userUuid;
		this.postUuid = entity.postUuid;
	}

	public toPOJO(): Like {
		return {
			uuid: this.uuid,
			userUuid: this.userUuid,
			postUuid: this.postUuid
		}
	}
}