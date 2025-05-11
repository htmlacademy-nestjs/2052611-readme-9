import { Tag } from "./tag.inteface";
import { Entity, StorableEntity } from '@project/shared/src/index';

export class TagEntity extends Entity implements StorableEntity<Tag> {
	public name: string;

	constructor(tag: Tag) {
		super();
		this.uuid = tag.uuid ?? '';
		this.name = tag.name;
	}

	public toPOJO(): Tag {
		return {
			uuid: this.uuid,
			name: this.name
		}
	}
}