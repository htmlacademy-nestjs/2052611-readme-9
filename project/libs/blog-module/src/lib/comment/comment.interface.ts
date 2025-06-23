export interface Comment {
	id?: string,
	postId: string,
	userId: string,
	createdAt?: Date,
	text: string
}