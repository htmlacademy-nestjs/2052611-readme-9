export interface BlogPost {
	id?: string,
	typeId: string,
	userId: string,
	creationDate: Date,
	publicationDate: Date,
	isPublished: boolean,
	tags?: string[],
	data: string
}