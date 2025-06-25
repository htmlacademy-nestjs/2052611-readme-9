import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateCommentDto } from "../../dto/create-comment.dto.js";
import { Comment } from "./comment.interface";
import { CommentService } from "./comment.service";
import { fillDto } from "@project/shared";
import { DeleteByUserDto } from "../../dto/delete-by-user.dto.js";
import { ApiParam } from "@nestjs/swagger";
import { CommentQuery } from "./comment.query.js";
import { CommentWithPaginationRdo } from "../../rdo/comment-with-pagination.rdo.js";

@Controller()
export class CommentController {
	constructor(
		private readonly service: CommentService
	) { }

	@ApiParam({
		name: 'postId',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@Post('posts/:postId/comments')
	public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDto): Promise<Comment> {
		const newComment = await this.service.create(postId, dto);
		return newComment.toPOJO();
	}

	@ApiParam({
		name: 'postId',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@Delete('comments/:id')
	public async delete(@Param('id') id: string, @Body() dto: DeleteByUserDto) {
		await this.service.delete(id, dto);
	}

	@ApiParam({
		name: 'postId',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@Get('posts/:postId/comments')
	public async findByPost(@Param('postId') postId: string, @Query() query: CommentQuery) {
		return await this.service.findByPost(postId, query);
	}
}