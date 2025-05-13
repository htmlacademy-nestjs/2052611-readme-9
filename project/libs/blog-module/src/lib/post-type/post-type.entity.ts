import { PostType } from "./post-type.interface";
import { Entity, StorableEntity } from '@project/shared/src/index';

export class PostTypeEntity extends Entity implements StorableEntity<PostType> {
	public name: string;
	constructor(postType: PostType) {
		super();
		this.uuid = postType.uuid ?? '';
		this.name = postType.name;
	}

	public toPOJO(): PostType {
		return {
			uuid: this.uuid,
			name: this.name
		}
	}
}