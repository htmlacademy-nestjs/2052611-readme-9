import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { CreatePostDto } from "src/dto/create-post.dto";
import { BlogPost } from "./post.interface";
import { BlogPostService } from "./post.service";

@Controller('posts')
export class BlogPostController {
	constructor(
		private readonly service: BlogPostService
	) { }

	@Post()
	public async create(@Body() dto: CreatePostDto): Promise<BlogPost> {
		const newPost = await this.service.create(dto);
		return newPost.toPOJO();
	}

	@Delete(':id')
	public async delete(@Param('id') id: string) {
		this.service.delete(id);
	}

	@Post(':id/repost')
	public async repost(@Param('id') id: string) {
		this.service.repost(id);
	}

}