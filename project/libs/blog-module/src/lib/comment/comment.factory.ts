import { Injectable } from "@nestjs/common";
import { EntityFactory } from "@project/shared";
import { CommentEntity } from "./comment.entity";
import { Comment } from "./comment.interface";

@Injectable()
export class CommentEntityFactory implements EntityFactory<CommentEntity> {
	public create(entityPlainData: Comment): CommentEntity {
		return new CommentEntity(entityPlainData);
	}
}