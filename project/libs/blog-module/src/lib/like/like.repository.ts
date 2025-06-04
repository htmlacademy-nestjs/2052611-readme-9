import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared';
import { LikeEntity } from './like.entity';
import { LikeEntityFactory } from './like.factory';
import { Like } from './like.interface';

@Injectable()
export class LikeRepository extends BaseMemoryRepository<LikeEntity> {
	constructor(entityFactory: LikeEntityFactory) {
		super(entityFactory);
	}

	public async findByPost(postId: string): Promise<Like[]> {
		const entities = Array.from(this.entities.values());
		return entities.filter((entity) => entity.postId === postId);
	}

	public async findByPostAndUser(postId: string, userId: string): Promise<LikeEntity | null> {
		const entities = Array.from(this.entities.values());
		const like = entities.find((entity) => entity.postId === postId && entity.userId === userId);

		if (!like) {
			return null;
		}

		return this.entityFactory.create(like);
	}
}