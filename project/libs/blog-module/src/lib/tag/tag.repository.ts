import { BaseMemoryRepository } from "@project/shared";
import { TagEntity } from "./tag.entity";
import { TagEntityFactory } from "./tag.factory";

export class TagRepository extends BaseMemoryRepository<TagEntity> {
	constructor(entityFactory: TagEntityFactory) {
		super(entityFactory);
	}

	public async findByName(name: string): Promise<TagEntity | null> {
		const entities = Array.from(this.entities.values());
		const newEntity = entities.find(entity => entity.name === name);
		if (!newEntity) {
			return null;
		}
		return this.entityFactory.create(newEntity);
	}
}