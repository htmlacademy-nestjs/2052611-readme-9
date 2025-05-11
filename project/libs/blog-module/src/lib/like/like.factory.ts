import { Injectable } from "@nestjs/common";
import { LikeEntity } from "./like.entity";
import { Like } from "./like.interface";
import { EntityFactory } from "@project/shared/src/index";

@Injectable()
export class LikeEntityFactory implements EntityFactory<LikeEntity> {
	public create(entityPlainData: Like): LikeEntity {
		return new LikeEntity(entityPlainData);
	}
}