import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { CreatePostDto } from "../../dto/create-post.dto";
import { BlogPost } from "./post.interface";
import { BlogPostService } from "./post.service";

@Controller()
export class BlogPostController {
	constructor(
		private readonly service: BlogPostService
	) { }

	@Post('posts/')
	public async create(@Body() dto: CreatePostDto): Promise<BlogPost> {
		const newPost = await this.service.create(dto);
		return newPost.toPOJO();
	}

	@Delete('posts/:id')
	public async delete(@Param('id') id: string) {
		this.service.delete(id);
	}

	@Post('posts/:id/repost')
	public async repost(@Param('id') id: string) {
		this.service.repost(id);
	}

}