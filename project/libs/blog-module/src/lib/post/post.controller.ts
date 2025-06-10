import { Body, Controller, Delete, Param, Post, Query, Get } from "@nestjs/common";
import { CreatePostDto } from "../../dto/create-post.dto";
import { BlogPost } from "./post.interface";
import { BlogPostService } from "./post.service";
import { fillDto } from "@project/shared";
import { ApiTags } from "@nestjs/swagger";
/*
import { BlogPostQuery } from "./post.query";
import { PostWithPaginationRdo } from "src/rdo/post-with-pagination.rdo";
*/

@ApiTags('Posts')
@Controller()
export class BlogPostController {
	constructor(
		private readonly service: BlogPostService
	) { }
	/*
		@Get('posts/')
		public async getAll(@Query() query: BlogPostQuery) {
			const postsWithPagination = await this.service.getAllPosts(query);
			const result = {
				...postsWithPagination,
				entities: postsWithPagination.entities.map((post) => post.toPOJO()),
			}
			return fillDto(PostWithPaginationRdo, result);
		}
	*/

	@Get('posts/:id')
	public async getPost(@Param('id') id: string): Promise<BlogPost> {
		const record = await this.service.getPost(id);
		return record.toPOJO();
	}

	@Post('posts/')
	public async create(@Body() dto: CreatePostDto): Promise<BlogPost> {
		const newPost = await this.service.create(dto);
		return fillDto(CreatePostDto, newPost.toPOJO());
	}

	@Delete('posts/:id')
	public async delete(@Param('id') id: string) {
		this.service.delete(id);
	}

	@Post('posts/:id/repost')
	public async repost(@Param('id') id: string, @Query('userId') userId: string) {
		this.service.repost(id, userId);
	}

}