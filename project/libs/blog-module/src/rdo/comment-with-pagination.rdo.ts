import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { CommentRdo } from "./comment.rdo";

export class CommentWithPaginationRdo {
	@ApiProperty({
		type: [CommentRdo]
	})
	@Expose()
	public entities: CommentRdo[];

	@ApiProperty()
	@Expose()
	public totalPages: number;

	@ApiProperty()
	@Expose()
	public totalItems: number;

	@ApiProperty()
	@Expose()
	public currentPage: number;

	@ApiProperty()
	@Expose()
	public itemsPerPage: number;
}