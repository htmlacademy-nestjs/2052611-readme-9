import { Body, Controller, Delete, Param, Post, Query, Get, Patch } from "@nestjs/common";
import { CreatePostDto } from "../../dto/create-post.dto";
import { BlogPostService } from "./post.service";
import { fillDto } from "@project/shared";
import { ApiTags } from "@nestjs/swagger";
import { BlogPostQuery } from "./post.query";
import { PostWithPaginationRdo } from "../../rdo/post-with-pagination.rdo";
import { UpdatePostDto } from "../../dto/update-post.dto";
import { BlogPostRdo } from "../../rdo/post.rdo";

@ApiTags('Posts')
@Controller()
export class BlogPostController {
	constructor(
		private readonly service: BlogPostService
	) { }

	@Get('posts/')
	public async getAll(@Query() query: BlogPostQuery) {
		const postsWithPagination = await this.service.getAllPosts(query);
		const result = {
			...postsWithPagination,
			entities: postsWithPagination.entities.map((post) => post.toPOJO()),
		}
		return fillDto(PostWithPaginationRdo, result);
	}

	@Get('posts/:id')
	public async getPost(@Param('id') id: string) {
		const record = await this.service.getPost(id);
		return fillDto(BlogPostRdo, record.toPOJO());
	}

	@Post('posts/')
	public async create(@Body() dto: CreatePostDto) {
		const newPost = await this.service.create(dto);
		return fillDto(BlogPostRdo, newPost.toPOJO());
	}

	@Delete('posts/:id')
	public async delete(@Param('id') id: string) {
		this.service.delete(id);
	}

	@Patch('/:id')
	public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
		const updatedPost = await this.service.updatePost(id, dto);
		return fillDto(BlogPostRdo, updatedPost.toPOJO());
	}

	@Post('posts/:id/repost')
	public async repost(@Param('id') id: string, @Query('userId') userId: string) {
		this.service.repost(id, userId);
	}

}