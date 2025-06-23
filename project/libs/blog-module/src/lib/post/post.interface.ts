export interface BlogPost {
	id?: string,
	typeId: string,
	userId: string,
	createdAt?: Date,
	updatedAt?: Date,
	isPublished: boolean,
	tags?: string[],
	title?: string,
	url?: string,
	preview?: string,
	text?: string,
	quote?: string,
	author?: string,
	file?: string,
	description?: string,
	originalPostId?: string
}