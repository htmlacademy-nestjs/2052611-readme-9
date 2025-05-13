import { Injectable } from "@nestjs/common";
import { BaseMemoryRepository } from "@project/shared/src/index";
import { PostTypeEntity } from "./post-type.entity";
import { PostTypeEntityFactory } from "./post-type.factory";

@Injectable()
export class PostTypeRepository extends BaseMemoryRepository<PostTypeEntity> {
	constructor(entityFactory: PostTypeEntityFactory) {
		super(entityFactory);
	}

	public async findByName(name: string): Promise<PostTypeEntity | null> {
		const entities = Array.from(this.entities.values());
		const newEntity = entities.find(entity => entity.name === name);
		if (!newEntity) {
			return null;
		}
		return this.entityFactory.create(newEntity);
	}
}