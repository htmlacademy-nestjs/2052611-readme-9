export abstract class Entity {
	private _uuid = '';

	public get uuid(): string {
		return this._uuid;
	}

	public set uuid(value: string) {
		this._uuid = value;
	}
}