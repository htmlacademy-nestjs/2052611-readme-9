export interface User {
	uuid?: string,
	email: string,
	name: string,
	passwordHash: string;
	image: string
}