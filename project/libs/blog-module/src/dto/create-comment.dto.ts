export class CreateCommentDto {
	public postId: string;
	public userId: string;
	public text: string;
	public creationDate: Date;
}