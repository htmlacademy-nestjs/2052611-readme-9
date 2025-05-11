import { Injectable } from "@nestjs/common";
import { TagEntity } from "./tag.entity";
import { Tag } from "./tag.inteface";
import { EntityFactory } from "@project/shared";

@Injectable()
export class TagEntityFactory implements EntityFactory<TagEntity> {
	public create(entityPlainData: Tag): TagEntity {
		return new TagEntity(entityPlainData);
	}
}
