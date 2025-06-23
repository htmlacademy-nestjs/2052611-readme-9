import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_PAGE_COUNT } from '@project/shared';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_COMMENT_COUNT_LIMIT } from './comment.constant';


export class CommentQuery {
	@ApiProperty({
		name: 'limit',
		description: 'Comment count limit',
		type: 'integer',
		minimum: 1,
		default: DEFAULT_COMMENT_COUNT_LIMIT,
		required: false
	})
	@Transform(({ value }) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
	@IsNumber()
	@IsOptional()
	public limit = DEFAULT_COMMENT_COUNT_LIMIT;

	@ApiProperty({
		name: 'page',
		description: 'Page number',
		type: 'integer',
		minimum: 1,
		default: DEFAULT_PAGE_COUNT,
		required: false
	})
	@Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
	@IsOptional()
	public page: number = DEFAULT_PAGE_COUNT;
}