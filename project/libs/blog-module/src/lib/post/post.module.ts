import { Module } from "@nestjs/common";
/*
import { CommentModule } from "../comment/comment.module";
import { LikeModule } from "../like/like.module";
import { TagModule } from "../tag/tag.module";
*/
import { BlogPostController } from "./post.controller";
import { BlogPostService } from "./post.service";
import { BlogPostRepository } from "./post.repository";
import { BlogPostEntityFactory } from "./post.factory";
import { PrismaClientModule } from "@project/shared";

@Module({
	controllers: [BlogPostController],
	providers: [BlogPostRepository, BlogPostService, BlogPostEntityFactory],
	exports: [BlogPostService],
	imports: [PrismaClientModule]
})
export class BlogPostModule { }