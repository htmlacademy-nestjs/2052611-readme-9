import { Module } from "@nestjs/common";
import { LikeController } from "./like.controller";
import { LikeService } from "./like.service";
import { LikeRepository } from "./like.repository";
import { LikeEntityFactory } from "./like.factory";
import { PrismaClientModule } from "@project/shared";

@Module({
	controllers: [LikeController],
	providers: [LikeService, LikeRepository, LikeEntityFactory],
	exports: [LikeService],
	imports: [PrismaClientModule]
})
export class LikeModule { }