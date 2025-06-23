export enum BlogPostSortBy {
	Date = 'date',
	Likes = 'likes',
	Comments = 'comments'
};
export const DEFAULT_POST_SORT_BY = BlogPostSortBy.Date;
export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_POST_PUBLICATION_STATUS = true;