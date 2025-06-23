import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "../../dto/create-post.dto";
import { BlogPostEntity } from "./post.entity";
import { BlogPostRepository } from "./post.repository";
import { PostTypeUUID } from '../post-type/post-type.constant';
import { BlogPostQuery } from "./post.query";
import { fillDto, PaginationResult } from "@project/shared";
import { UpdatePostDto } from "../../dto/update-post.dto";
import { DeleteByUserDto } from "../../dto/delete-by-user.dto";
import { TagService } from "../tag/tag.service";
import { CommentService } from "../comment/comment.service";
import { LikeService } from "../like/like.service";
import { PostTypeService } from "../post-type/post-type.service";
import { PostTypeRdo } from "../../rdo/post-type.rdo";
import { OriginalPostRdo } from "../../rdo/original-post.rdo";
import { RepostRdo } from "../../rdo/repost.rdo";
import { TagRdo } from "../../rdo/tag.rdo";

@Injectable()
export class BlogPostService {
	constructor(
		private readonly repository: BlogPostRepository,
		private readonly tagService: TagService,
		private readonly commentService: CommentService,
		private readonly likeService: LikeService,
		private readonly postTypeService: PostTypeService
	) { }

	public async addPostInfo(post: BlogPostEntity) {
		const postTypeEntity = await this.postTypeService.findById(post.typeId);
		const tagEntities = await this.tagService.findByPost(post.id);
		const repostEntities = await this.repostsByPostId(post.id);
		const originalPostEntity = post.originalPostId ? await this.findById(post.originalPostId) : null;
		const tags = fillDto(TagRdo, tagEntities.map(el => el.toPOJO()));
		const reposts = fillDto(RepostRdo, repostEntities.map(el => el.toPOJO()));
		const likes = await this.likeService.countByPostId(post.id);
		const comments = await this.commentService.countByPostId(post.id);
		return {
			postType: fillDto(PostTypeRdo, (postTypeEntity).toPOJO()),
			tags: tags,
			numberOfComments: comments,
			numberOfLikes: likes,
			reposts: reposts,
			originalPost: fillDto(OriginalPostRdo, originalPostEntity)
		}
	}

	public async create(dto: CreatePostDto): Promise<BlogPostEntity> {
		const newEntity = new BlogPostEntity(dto);
		await this.repository.save(newEntity);
		return newEntity;
	}

	public async delete(id: string, dto: DeleteByUserDto) {
		const existingPost = await this.repository.findById(id);
		if (existingPost) {
			if (existingPost.userId !== dto.userId) {
				throw new ForbiddenException(`Post was created by user ${existingPost.userId}, it can't be deleted by user ${dto.userId}`)
			}
			this.repository.deleteById(id);
		} else {
			throw new NotFoundException(`Post with id="${id}" does not exists`)
		}
	}

	public async update(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
		const existingPost = await this.repository.findById(id);
		let hasChanges = false;

		if (existingPost.userId !== dto.userId) {
			throw new ForbiddenException(`Post was created by user ${existingPost.userId}, it can't be edited by user ${dto.userId}`)
		}

		for (const [key, value] of Object.entries(dto)) {
			if (value !== undefined && existingPost[key] !== value) {
				existingPost[key] = value;
				hasChanges = true;
			}
		}

		if (!hasChanges) {
			return existingPost;
		}
		await this.repository.update(existingPost);
		return existingPost;
	}

	public async findById(id: string): Promise<BlogPostEntity> {
		const existingPost = await this.repository.findById(id);
		if (existingPost) {
			return existingPost;
		} else {
			throw new NotFoundException(`Post with id="${id}" does not exists`);
		}
	}

	public async find(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
		return await this.repository.find(query);
	}

	public async repostsByPostId(postId: string): Promise<BlogPostEntity[]> {
		return await this.repository.repostsByPostId(postId);
	}

	public async countByUserId(userId: string): Promise<number> {
		return await this.repository.countByUserId(userId);
	}
}