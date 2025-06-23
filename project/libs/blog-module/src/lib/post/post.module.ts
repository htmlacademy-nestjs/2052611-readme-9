import { Module } from "@nestjs/common";
import { BlogPostController } from "./post.controller";
import { BlogPostService } from "./post.service";
import { BlogPostRepository } from "./post.repository";
import { BlogPostEntityFactory } from "./post.factory";
import { PrismaClientModule } from "@project/shared";
import { TagModule } from "../tag/tag.module";
import { CommentModule } from "../comment/comment.module";
import { LikeModule } from "../like/like.module";
import { PostTypeModule } from "../post-type/post-type.module";

@Module({
	controllers: [BlogPostController],
	providers: [BlogPostRepository, BlogPostService, BlogPostEntityFactory],
	exports: [BlogPostService],
	imports: [PrismaClientModule, TagModule, CommentModule, LikeModule, PostTypeModule]
})
export class BlogPostModule { }