import { Module } from "@nestjs/common";
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