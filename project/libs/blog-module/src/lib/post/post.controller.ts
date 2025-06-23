import { Body, Controller, Delete, Param, Post, Query, Get, Patch } from "@nestjs/common";
import { CreatePostDto } from "../../dto/create-post.dto";
import { BlogPostService } from "./post.service";
import { fillDto } from "@project/shared";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { BlogPostQuery } from "./post.query";
import { PostWithPaginationRdo } from "../../rdo/post-with-pagination.rdo";
import { UpdatePostDto } from "../../dto/update-post.dto";
import { BlogPostRdo } from "../../rdo/post.rdo";
import { TagService } from "../tag/tag.service";
import { DeleteByUserDto } from "../../dto/delete-by-user.dto";

@ApiTags('Posts')
@Controller()
export class BlogPostController {
	constructor(
		private readonly service: BlogPostService,
		private readonly tagService: TagService
	) { }

	@Get('posts/')
	public async find(@Query() query: BlogPostQuery) {
		const postsWithPagination = await this.service.find(query);
		const entities = postsWithPagination.entities;
		const posts = [];
		for (let item of entities) {
			const info = await this.service.addPostInfo(item);
			posts.push({
				...item.toPOJO(),
				...info
			});
		}
		const result = {
			...postsWithPagination,
			entities: posts
		}
		return fillDto(PostWithPaginationRdo, result);
	}

	@ApiParam({
		name: 'id',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@Get('posts/:id')
	public async findById(@Param('id') id: string) {
		const record = await this.service.findById(id);
		const info = await this.service.addPostInfo(record);
		return fillDto(BlogPostRdo, {
			...record.toPOJO(),
			...info
		});
	}

	@ApiBody({
		type: CreatePostDto
	})
	@Post('posts/')
	public async create(@Body() dto: CreatePostDto) {
		const newPost = await this.service.create(dto);
		await this.tagService.savePostTags(dto.tags, newPost.id);

		const info = await this.service.addPostInfo(newPost);
		return fillDto(BlogPostRdo, {
			...newPost.toPOJO(),
			...info
		});
	}

	@ApiParam({
		name: 'id',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@Delete('posts/:id')
	public async delete(@Param('id') id: string, @Body() dto: DeleteByUserDto) {
		await this.service.delete(id, dto);
	}

	@ApiParam({
		name: 'id',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@Patch('posts/:id')
	public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
		const updatedPost = await this.service.update(id, dto);
		const tagEntities = await this.tagService.findByPost(id);
		return fillDto(BlogPostRdo, { ...updatedPost.toPOJO(), tags: tagEntities.map(el => el.toPOJO()) });
	}

	@Get('users/:id/posts')
	public async countByUserId(@Param('id') id: string) {
		return {
			"numberOfPosts": await this.service.countByUserId(id)
		}
	}
}