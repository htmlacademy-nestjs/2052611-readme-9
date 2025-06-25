import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "../../dto/create-comment.dto";
import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { DeleteByUserDto } from "../../dto/delete-by-user.dto";
import { CommentQuery } from "./comment.query";
import { fillDto } from "@project/shared";
import { CommentWithPaginationRdo } from "../../rdo/comment-with-pagination.rdo";

@Injectable()
export class CommentService {
	constructor(
		private readonly repository: CommentRepository
	) { }

	public async create(postId: string, dto: CreateCommentDto): Promise<CommentEntity> {
		const comment = {
			postId,
			...dto
		};
		const newEntity = new CommentEntity(comment);
		await this.repository.save(newEntity);
		return newEntity;
	}

	public async delete(id: string, dto: DeleteByUserDto) {
		const existingComment = await this.repository.findById(id);
		if (existingComment) {
			if (existingComment.userId !== dto.userId) {
				throw new ForbiddenException(`Comment was created by user ${existingComment.userId}, it can't be deleted by user ${dto.userId}`)
			}
			this.repository.deleteById(id);
		} else {
			throw new NotFoundException(`Comment with id="${id}" does not exists`)
		}
	}

	public async findByPost(postId: string, query?: CommentQuery): Promise<CommentWithPaginationRdo> {
		const commentsWithPagination = await this.repository.findByPostId(postId, query);
		const result = {
			...commentsWithPagination,
			entities: commentsWithPagination.entities.map((el) => el.toPOJO()),
		}
		return fillDto(CommentWithPaginationRdo, result);
	}

	public async countByPostId(postId: string): Promise<number> {
		return await this.repository.countByPostId(postId);
	}
}