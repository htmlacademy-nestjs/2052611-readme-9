import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export function fillDto<T, V>(
	DtoClass: new () => T,
	plainObject: V,
	options?: ClassTransformOptions,
): T;

export function fillDto<T, V extends []>(
	DtoClass: new () => T,
	plainObject: V,
	options?: ClassTransformOptions,
): T[];

export function fillDto<T, V>(
	DtoClass: new () => T,
	plainObject: V,
	options?: ClassTransformOptions,
): T | T[] {
	return plainToInstance(DtoClass, plainObject, {
		excludeExtraneousValues: true,
		...options,
	});
}

export function getMongoConnectionString(username: string,
	password: string,
	host: string,
	port: string,
	databaseName: string,
	authDatabase: string): string {
	return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}