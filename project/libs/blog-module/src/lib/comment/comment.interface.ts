export interface Comment {
	uuid?: string,
	postUuid: string,
	userUuid: string,
	text: string,
	creationDate: Date
}