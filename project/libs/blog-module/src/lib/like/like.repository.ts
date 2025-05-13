import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/src/index';
import { LikeEntity } from './like.entity';
import { LikeEntityFactory } from './like.factory';
import { Like } from './like.interface';

@Injectable()
export class LikeRepository extends BaseMemoryRepository<LikeEntity> {
	constructor(entityFactory: LikeEntityFactory) {
		super(entityFactory);
	}

	public async findByPost(postUuid: string): Promise<Like[]> {
		const entities = Array.from(this.entities.values());
		return entities.filter((entity) => entity.postUuid === postUuid);
	}

	public async findByPostAndUser(postUuid: string, userUuid: string): Promise<LikeEntity | null> {
		const entities = Array.from(this.entities.values());
		const like = entities.find((entity) => entity.postUuid === postUuid && entity.userUuid === userUuid);

		if (!like) {
			return null;
		}

		return this.entityFactory.create(like);
	}
}