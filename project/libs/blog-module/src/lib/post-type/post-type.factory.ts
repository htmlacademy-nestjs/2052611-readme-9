import { Injectable } from "@nestjs/common";
import { PostTypeEntity } from "./post-type.entity";
import { PostType } from "./post-type.interface";
import { EntityFactory } from "@project/shared/src/lib/core/entity.factory";

@Injectable()
export class PostTypeEntityFactory implements EntityFactory<PostTypeEntity> {
	public create(entityPlainData: PostType): PostTypeEntity {
		return new PostTypeEntity(entityPlainData)
	}
}