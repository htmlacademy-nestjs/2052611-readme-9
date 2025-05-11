import { Injectable } from "@nestjs/common";
import { BlogPostEntity } from "./post.entity";
import { BlogPost } from "./post.interface";
import { EntityFactory } from "@project/shared/src/lib/core/entity.factory";

@Injectable()
export class BlogPostEntityFactory implements EntityFactory<BlogPostEntity> {
	public create(entityPlainData: BlogPost): BlogPostEntity {
		return new BlogPostEntity(entityPlainData);
	}
}