export class CreatePostDto {
	public typeUuid: string;
	public userUuid: string;
	public creationDate: Date;
	public publicationDate: Date;
	public isPublished: boolean;
	public tags?: string[];
	public data: string;
}