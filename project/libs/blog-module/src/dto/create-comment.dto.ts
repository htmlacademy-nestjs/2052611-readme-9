export class CreateCommentDto {
	public postUuid: string;
	public userUuid: string;
	public text: string;
	public creationDate: Date;
}