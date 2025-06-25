export const SALT_ROUNDS = 10;
export enum AuthErrorMessage {
	UserExists = 'User with this email already exists',
	UserNotFound = 'User not found',
	WrongPassword = 'User password is wrong',
	LoginError = 'Password or Login is wrong',
	EmailNotValid = 'Email is not valid'
};
export enum AuthSuccessMessage {
	UserCreated = 'New user has been successfully created',
	UserFound = 'User found',
	LoginSuccess = 'User has been successfully logged'
};
