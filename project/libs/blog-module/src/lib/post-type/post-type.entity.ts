import { PostType } from "./post-type.interface";
import { Entity, StorableEntity } from '@project/shared';

export class PostTypeEntity extends Entity implements StorableEntity<PostType> {
	public name: string;
	constructor(postType: PostType) {
		super();
		this.id = postType.id ?? '';
		this.name = postType.name;
	}

	public toPOJO(): PostType {
		return {
			id: this.id,
			name: this.name
		}
	}
}