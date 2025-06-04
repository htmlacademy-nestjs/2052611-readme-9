import { Injectable } from "@nestjs/common";
import { BaseMemoryRepository } from "@project/shared";
import { BlogPostEntity } from "./post.entity";
import { BlogPostEntityFactory } from "./post.factory";

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
	constructor(entityFactory: BlogPostEntityFactory) {
		super(entityFactory);
	}
}