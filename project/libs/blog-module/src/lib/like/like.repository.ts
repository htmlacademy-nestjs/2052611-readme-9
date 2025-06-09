import { Injectable } from '@nestjs/common';
import { BasePostgresRepository, PrismaClientService } from '@project/shared';
import { LikeEntity } from './like.entity';
import { LikeEntityFactory } from './like.factory';
import { Like } from './like.interface';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
	constructor(entityFactory: LikeEntityFactory, readonly client: PrismaClientService) {
		super(entityFactory, client);
	}

	public async countByPost(postId: string): Promise<Number> {
		return await this.client.like.count({
			where: {
				postId
			}
		});
	}

	public async findByPostAndUser(postId: string, userId: string): Promise<Boolean> {
		const record = await this.client.like.findFirst({
			where: {
				postId,
				userId
			}
		})
		return record ? true : false;
	}

	public async save(entity: LikeEntity): Promise<void> {
		const pojo = entity.toPOJO();
		await this.client.like.create({
			data: {
				postId: pojo.postId,
				userId: pojo.userId
			}
		})
	}

	public async delete(postId: string, userId: string): Promise<void> {
		await this.client.like.delete({
			where: {
				postId_userId: {
					postId,
					userId
				}
			}
		})
	}
}