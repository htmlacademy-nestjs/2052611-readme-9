import { Module } from "@nestjs/common";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { TagRepository } from "./tag.repository";
import { TagEntityFactory } from "./tag.factory";
import { PrismaClientModule } from "@project/shared";

@Module({
	controllers: [TagController],
	providers: [TagService, TagRepository, TagEntityFactory],
	exports: [TagService],
	imports: [PrismaClientModule]
})
export class TagModule { }