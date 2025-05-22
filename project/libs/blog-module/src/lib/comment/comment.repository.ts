import { BaseMemoryRepository } from "@project/shared/src/index";
import { CommentEntity } from "./comment.entity";
import { CommentEntityFactory } from "./comment.factory";
import { Comment } from "./comment.interface";

export class CommentRepository extends BaseMemoryRepository<CommentEntity> {
	constructor(entityFactory: CommentEntityFactory) {
		super(entityFactory);
	}

	public async findAllByPost(postId: string): Promise<Comment[]> {
		const entities = Array.from(this.entities.values());
		return entities.filter(entity => entity.postId === postId);
	}

}