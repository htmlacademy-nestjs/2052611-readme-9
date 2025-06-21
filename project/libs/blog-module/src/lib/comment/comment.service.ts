import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "../../dto/create-comment.dto";
import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";

@Injectable()
export class CommentService {
	constructor(
		private readonly repository: CommentRepository
	) { }

	public async create(dto: CreateCommentDto): Promise<CommentEntity> {
		const comment = {
			createdAt: new Date(),
			...dto
		};
		const newEntity = new CommentEntity(comment);
		this.repository.save(newEntity);
		return newEntity;
	}

	public async delete(id: string) {
		this.repository.deleteById(id);
	}

	public async findByPost(postId: string): Promise<CommentEntity[]> {
		return await this.repository.findByPostId(postId);
	}
}