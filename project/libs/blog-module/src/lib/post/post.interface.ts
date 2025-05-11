export interface BlogPost {
	uuid?: string,
	typeUuid: string,
	userUuid: string,
	creationDate: Date,
	publicationDate: Date,
	isPublished: boolean,
	tags?: string[],
	data: string
}