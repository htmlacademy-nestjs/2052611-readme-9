import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateCommentDto } from "src/dto/create-comment.dto";
import { Comment } from "./comment.interface";
import { CommentService } from "./comment.service";
import { fillDto } from "@project/shared";
import { CommentRdo } from "src/rdo/comment.rdo";

@Controller()
export class CommentController {
	constructor(
		private readonly service: CommentService
	) { }

	@Post('comments/')
	public async create(@Body() dto: CreateCommentDto): Promise<Comment> {
		const newComment = await this.service.create(dto);
		return newComment.toPOJO();
	}

	@Delete('comments/:id')
	public async delete(@Param('id') id: string) {
		this.service.delete(id);
	}

	@Get('posts/:postId/comments')
	public async findByPost(@Param('postId') postId: string) {
		const comments = await this.service.findByPost(postId);
		return fillDto(CommentRdo, comments.map(el => el.toPOJO()));
	}
}