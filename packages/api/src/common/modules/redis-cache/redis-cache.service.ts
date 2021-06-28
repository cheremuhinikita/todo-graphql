import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
	constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

	async get<T>(id: number): Promise<T> {
		return this.cache.get<T>(id.toString());
	}

	async set<T>(id: number, entity: T): Promise<void> {
		await this.cache.set<T>(id.toString(), entity);
	}

	async reset(): Promise<void> {
		await this.cache.reset();
	}

	async del(id: number): Promise<void> {
		await this.cache.del(id.toString());
	}
}
