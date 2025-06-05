import { Injectable } from "@nestjs/common";
import { BasePostgresRepository, PrismaClientService } from "@project/shared";
import { BlogPostEntity } from "./post.entity";
import { BlogPostEntityFactory } from "./post.factory";
import { BlogPost } from "./post.interface";

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, BlogPost> {
	constructor(entityFactory: BlogPostEntityFactory,
		readonly client: PrismaClientService) {
		super(entityFactory, client);
	}
}