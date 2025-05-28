import { Tag } from "./tag.inteface";
import { Entity, StorableEntity } from '@project/shared';

export class TagEntity extends Entity implements StorableEntity<Tag> {
	public name: string;

	constructor(tag: Tag) {
		super();
		this.id = tag.id ?? '';
		this.name = tag.name;
	}

	public toPOJO(): Tag {
		return {
			id: this.id,
			name: this.name
		}
	}
}