import { Module } from "@nestjs/common";
import { PostTypeController } from "./post-type.controller";
import { PostTypeService } from "./post-type.service";
import { PostTypeRepository } from "./post-type.repository";
import { PostTypeEntityFactory } from "./post-type.factory";
import { PrismaClientModule } from "@project/shared";

@Module({
	controllers: [PostTypeController],
	providers: [PostTypeService, PostTypeRepository, PostTypeEntityFactory],
	exports: [PostTypeService],
	imports: [PrismaClientModule]
})
export class PostTypeModule { }