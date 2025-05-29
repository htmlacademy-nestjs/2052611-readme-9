import { Module } from "@nestjs/common";
/*
import { CommentModule } from "../comment/comment.module";
import { LikeModule } from "../like/like.module";
import { TagModule } from "../tag/tag.module";
*/
import { BlogPostController } from "./post.controller";
import { BlogPostService } from "./post.service";

@Module({
	controllers: [BlogPostController],
	providers: [BlogPostService],
	exports: [BlogPostService]
	/*imports: [TagModule, LikeModule, CommentModule]*/
})
export class BlogPostModule { }