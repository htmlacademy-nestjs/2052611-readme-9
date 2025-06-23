import { Transform } from 'class-transformer';
import { IsBoolean, IsBooleanString, isEnum, IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { DEFAULT_PAGE_COUNT, DEFAULT_SORT_DIRECTION, SortDirection } from '@project/shared';
import { BlogPostSortBy, DEFAULT_POST_COUNT_LIMIT, DEFAULT_POST_PUBLICATION_STATUS, DEFAULT_POST_SORT_BY } from './post.constant';
import { ApiProperty } from '@nestjs/swagger';
import { PostTypeUUID } from '../post-type/post-type.constant';


export class BlogPostQuery {
	@ApiProperty({
		name: 'limit',
		description: 'Post count limit',
		type: 'integer',
		minimum: 1,
		default: DEFAULT_POST_COUNT_LIMIT,
		required: false
	})
	@Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
	@IsNumber()
	@IsOptional()
	public limit?: number = DEFAULT_POST_COUNT_LIMIT;

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
	public page?: number = DEFAULT_PAGE_COUNT;

	@ApiProperty({
		name: 'sortBy',
		description: 'Sort by',
		type: 'string',
		enum: BlogPostSortBy,
		default: DEFAULT_POST_SORT_BY,
		required: false,
		additionalProperties: false
	})
	@IsEnum(BlogPostSortBy)
	@IsOptional()
	public sortBy?: BlogPostSortBy = DEFAULT_POST_SORT_BY;

	@ApiProperty({
		name: 'sortDirection',
		description: 'Direction of sorting',
		type: 'string',
		enum: SortDirection,
		default: DEFAULT_SORT_DIRECTION,
		required: false,
		additionalProperties: false
	})
	@IsIn(Object.values(SortDirection))
	@IsOptional()
	public sortDirection?: SortDirection = DEFAULT_SORT_DIRECTION;

	@ApiProperty({
		name: 'tag',
		description: 'Find posts with this tag',
		type: 'string',
		format: 'uuid',
		required: false
	})
	@IsUUID()
	@IsOptional()
	public tag?: string;

	@ApiProperty({
		name: 'postType',
		description: `Find posts with this type: ${JSON.stringify(PostTypeUUID)}`,
		type: 'string',
		enum: PostTypeUUID,
		required: false,
		additionalProperties: false
	})
	@IsEnum(PostTypeUUID)
	@IsOptional()
	public postType?: string;

	@ApiProperty({
		name: 'userId',
		description: `Find posts by this user`,
		type: 'string',
		required: false
	})
	@IsOptional()
	@IsMongoId()
	public userId?: string;


	@ApiProperty({
		name: 'isPublished',
		description: 'Publication status of posts (true = published, false = draft)',
		type: 'boolean',
		default: DEFAULT_POST_PUBLICATION_STATUS,
		required: false
	})
	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	public isPublished?: boolean = DEFAULT_POST_PUBLICATION_STATUS;
}