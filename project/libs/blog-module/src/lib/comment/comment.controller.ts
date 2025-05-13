import { Body, Controller, Delete, Post } from "@nestjs/common";
import { CreateCommentDto } from "src/dto/create-comment.dto";
import { Comment } from "./comment.interface";
import { CommentService } from "./comment.service";

@Controller('comments')
export class CommentController {
	constructor(
		private readonly service: CommentService
	) { }

	@Post()
	public async create(@Body() dto: CreateCommentDto): Promise<Comment> {
		const newComment = await this.service.create(dto);
		return newComment.toPOJO();
	}

	@Delete(':uuid')
	public async delete() {
		this.service.delete;
	}
}