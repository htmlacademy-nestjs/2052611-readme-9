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
		const { postUuid, userUuid, text } = dto;
		const comment = {
			postUuid,
			userUuid,
			text,
			creationDate: new Date()
		};
		const newEntity = new CommentEntity(comment);
		this.repository.save(newEntity);
		return newEntity;
	}

	public async delete(uuid: string) {
		this.repository.deleteById(uuid);
	}

	public async deleteByPost(postUuid: string) {
		const comments = this.repository.findAllByPost(postUuid);
		(await comments).forEach(item => this.repository.deleteById(item.uuid));
	}
}