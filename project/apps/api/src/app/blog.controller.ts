import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { BlogPostQuery, BlogPostRdo, CommentQuery, CommentRdo, CommentWithPaginationRdo, CreateCommentDto, CreateLikeDto, CreatePostDto, CreateTagDto, DeleteByUserDto, PostWithPaginationRdo, TagRdo, UpdatePostDto } from '@project/blog-module';
import { InjectUserIdInterceptor } from '@project/shared';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PostTypeUUID } from 'libs/blog-module/src/lib/post-type/post-type.constant';

@ApiBearerAuth('authorizationToken')
@Controller()
@UseFilters(AxiosExceptionFilter)
export class BlogController {

	constructor(
		private readonly httpService: HttpService,
	) { }

	/* ===== POSTS ===== */
	@ApiOperation({
		summary: "Create post",
		description: `Post types: ${JSON.stringify(PostTypeUUID)}`
	})
	@ApiCreatedResponse({
		type: BlogPostRdo
	})
	@UseGuards(CheckAuthGuard)
	@UseInterceptors(InjectUserIdInterceptor)
	@Post('/posts')
	public async createPost(@Body() dto: CreatePostDto) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/posts`, dto);
		return data;
	}

	@ApiOperation({
		summary: "Find and filter post(s) with pagination",
		description: `Post types: ${JSON.stringify(PostTypeUUID)}`
	})
	@ApiOkResponse({
		type: PostWithPaginationRdo
	})
	@Get('/posts')
	public async findPosts(@Query() query: BlogPostQuery) {
		const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/posts`, { params: { ...query } });
		return data;
	}

	@ApiOperation({
		summary: "Get full info about post by ID"
	})
	@ApiOkResponse({
		type: BlogPostRdo
	})
	@ApiParam({
		name: 'id',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@UseGuards(CheckAuthGuard)
	@Get('/posts/:id')
	public async getPost(@Param('id') id: string) {
		const postData = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/posts/${id}`);
		const userData = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${postData.data.userId}`);
		const userShortInfo = {
			id: userData.data.id,
			name: userData.data.name,
			email: userData.data.email
		}
		let output = {
			...postData.data,
			user: userShortInfo
		}
		output.userId = undefined;
		return output;
	}

	@ApiOperation({
		summary: "Update post by ID"
	})
	@ApiParam({
		name: 'id',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@UseGuards(CheckAuthGuard)
	@UseInterceptors(InjectUserIdInterceptor)
	@Patch('/posts/:id')
	public async updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
		const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/posts/${id}`, dto);
		return data;
	}

	@ApiOperation({
		summary: "Delete post by ID"
	})
	@ApiParam({
		name: 'id',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@UseGuards(CheckAuthGuard)
	@UseInterceptors(InjectUserIdInterceptor)
	@Delete('/posts/:id')
	public async deletePost(@Param('id') id: string, @Body() dto: DeleteByUserDto) {
		const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/posts/${id}`, { data: dto });
		return data;
	}

	/* ===== COMMENTS ===== */
	@ApiOperation({
		summary: "Create comment"
	})
	@ApiCreatedResponse({
		type: CommentRdo
	})
	@ApiParam({
		name: 'id',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@UseGuards(CheckAuthGuard)
	@UseInterceptors(InjectUserIdInterceptor)
	@Post('posts/:id/comments')
	public async createComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/posts/${id}/comments`, dto);
		return data;
	}

	@ApiOperation({
		summary: "Delete comment"
	})
	@ApiParam({
		name: 'id',
		description: 'ID of comment',
		type: 'string',
		format: 'uuid'
	})
	@UseGuards(CheckAuthGuard)
	@UseInterceptors(InjectUserIdInterceptor)
	@Delete('comments/:id')
	public async deleteComment(@Param('id') id: string, @Body() dto: DeleteByUserDto) {
		const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/comments/${id}`, { data: dto });
		return data;
	}

	@ApiOperation({
		summary: "Get all comments for post"
	})
	@ApiOkResponse({
		type: CommentWithPaginationRdo
	})
	@ApiQuery({
		type: CommentQuery
	})
	@ApiParam({
		name: 'id',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@Get('posts/:id/comments')
	public async getComments(@Param('id') id: string, query: CommentQuery) {
		const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/posts/${id}/comments`, { params: { ...query } });
		return data;
	}

	/* ===== LIKES ===== */
	@ApiOperation({
		summary: "Add/removed like to post"
	})
	@ApiParam({
		name: 'id',
		description: 'ID of post',
		type: 'string',
		format: 'uuid'
	})
	@UseGuards(CheckAuthGuard)
	@UseInterceptors(InjectUserIdInterceptor)
	@Post('posts/:id/like')
	public async addOrRemoveLike(@Param('id') id: string, @Body() dto: CreateLikeDto) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/posts/${id}/like`, dto);
		return data;
	}

	/* ===== TAGS ===== */
	@ApiOperation({
		summary: "Create tag"
	})
	@ApiOkResponse({
		type: TagRdo
	})
	@UseGuards(CheckAuthGuard)
	@Post('/tags')
	public async createTag(@Body() dto: CreateTagDto) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/tags`, dto);
		return data;
	}

	@ApiOperation({
		summary: "Get all tags"
	})
	@ApiOkResponse({
		type: [TagRdo]
	})
	@UseGuards(CheckAuthGuard)
	@Get('/tags')
	public async getAll() {
		const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/tags`);
		return data;
	}

}