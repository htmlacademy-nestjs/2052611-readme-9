import { Body, Controller, Delete, Param, Post, Query, Get, Patch } from "@nestjs/common";
import { CreatePostDto } from "../../dto/create-post.dto";
import { BlogPostService } from "./post.service";
import { fillDto } from "@project/shared";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { BlogPostQuery } from "./post.query";
import { PostWithPaginationRdo } from "../../rdo/post-with-pagination.rdo";
import { UpdatePostDto } from "../../dto/update-post.dto";
import { BlogPostRdo } from "../../rdo/post.rdo";
import { TagService } from "../tag/tag.service";
import { CommentService } from "../comment/comment.service";
import { LikeService } from "../like/like.service";

@ApiTags('Posts')
@Controller()
export class BlogPostController {
	constructor(
		private readonly service: BlogPostService,
		private readonly tagService: TagService,
		private readonly commentService: CommentService,
		private readonly likeService: LikeService
	) { }

	@ApiQuery({
		type: BlogPostQuery
	})
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
		const tagEntities = await this.tagService.findByPost(id);
		const commentEntities = await this.commentService.findByPost(id);
		const likes = await this.likeService.countByPost(id);
		return fillDto(BlogPostRdo, {
			...record.toPOJO(),
			tags: tagEntities.map(el => el.toPOJO()),
			comments: commentEntities.map(el => el.toPOJO()),
			likes: likes
		});
	}

	@Post('posts/')
	public async create(@Body() dto: CreatePostDto) {
		const newPost = await this.service.create(dto);
		const tagEntities = await this.tagService.findByIds(dto.tags);
		await this.service.saveTags(dto.tags, newPost.id);
		return fillDto(BlogPostRdo, { ...newPost.toPOJO(), tags: tagEntities.map(el => el.toPOJO()) });
	}

	@Delete('posts/:id')
	public async delete(@Param('id') id: string) {
		this.service.delete(id);
	}

	@Patch('posts/:id')
	public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
		const updatedPost = await this.service.update(id, dto);
		const tagEntities = await this.tagService.findByPost(id);
		return fillDto(BlogPostRdo, { ...updatedPost.toPOJO(), tags: tagEntities.map(el => el.toPOJO()) });
	}

	@Post('posts/:id/repost')
	public async repost(@Param('id') id: string, @Query('userId') userId: string) {
		this.service.repost(id, userId);
	}

}