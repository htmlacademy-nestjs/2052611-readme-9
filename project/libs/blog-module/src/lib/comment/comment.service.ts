import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "src/dto/create-comment.dto";
import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";

@Injectable()
export class CommentService {
	constructor(
		private readonly repository: CommentRepository
	) { }

	public async create(dto: CreateCommentDto): Promise<CommentEntity> {
		const { postId, userId, text } = dto;
		const comment = {
			postId,
			userId,
			text,
			creationDate: new Date()
		};
		const newEntity = new CommentEntity(comment);
		this.repository.save(newEntity);
		return newEntity;
	}

	public async delete(id: string) {
		this.repository.deleteById(id);
	}

	public async deleteByPost(postId: string) {
		const comments = this.repository.findAllByPost(postId);
		(await comments).forEach(item => this.repository.deleteById(item.id));
	}
}