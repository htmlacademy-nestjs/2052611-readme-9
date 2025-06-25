import { Body, Controller, Delete, Param, Post, Query, Get, Patch } from "@nestjs/common";
import { CreatePostDto } from "../../dto/create-post.dto";
import { BlogPostService } from "./post.service";
import { fillDto } from "@project/shared";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { BlogPostQuery } from "./post.query";
import { UpdatePostDto } from "../../dto/update-post.dto";
import { BlogPostRdo } from "../../rdo/post.rdo";
import { DeleteByUserDto } from "../../dto/delete-by-user.dto";
import { FeedQuery } from "./feed.query";

@ApiTags('Posts')
@Controller()
export class BlogPostController {
	constructor(
		private readonly service: BlogPostService
	) { }

	@Get('posts/')
	public async find(@Query() query: BlogPostQuery) {
		return await this.service.find(query);
	}

	@ApiParam({
		name: 'id',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@Get('posts/:id')
	public async findById(@Param('id') id: string) {
		return await this.service.get(id);
	}

	@ApiBody({
		type: CreatePostDto
	})
	@Post('posts/')
	public async create(@Body() dto: CreatePostDto) {
		return await this.service.create(dto);
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
		return await this.service.update(id, dto);
	}

	@Get('users/:id/posts')
	public async countByUserId(@Param('id') id: string) {
		return {
			"numberOfPosts": await this.service.countByUserId(id)
		}
	}

	@Post('users/:id/follow')
	public async addOrRemoveFollower(@Param('id') id: string, @Query('followingUserId') followingUserId: string) {
		await this.service.addOrRemoveFollower(id, followingUserId);
	}

	@Get('users/:id/feed')
	public async getFeed(@Param('id') id: string, @Query() query: FeedQuery) {
		return await this.service.getFeed(id, query);
	}
}