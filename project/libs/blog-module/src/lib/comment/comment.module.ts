import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentRepository } from "./comment.repository";
import { CommentEntityFactory } from "./comment.factory";
import { PrismaClientModule } from "@project/shared";

@Module({
	controllers: [CommentController],
	providers: [CommentService, CommentRepository, CommentEntityFactory],
	exports: [CommentService],
	imports: [PrismaClientModule]
})
export class CommentModule { }