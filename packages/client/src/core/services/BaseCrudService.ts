export abstract class BaseCrudService<T, U extends Record<string, unknown>> {
	public abstract create(input: U): Promise<T>;

	public abstract findAll(isNetworkOnly?: boolean): Promise<T[]>;

	public abstract findOne(id: number): Promise<T>;

	public abstract update(id: number, input: U): Promise<T>;

	public abstract remove(id: number): Promise<boolean>;
}
