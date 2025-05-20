export class CreatePostDto {
	public typeId: string;
	public userId: string;
	public creationDate: Date;
	public publicationDate: Date;
	public isPublished: boolean;
	public tags?: string[];
	public data: string;
}