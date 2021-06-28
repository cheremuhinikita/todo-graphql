import { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';

import { compareHash, generateHash } from '@common/utils';
import { RedisCacheService } from '@common/modules/redis-cache/redis-cache.service';

import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserSubscriber implements EventSubscriber<User> {
	constructor(private readonly redisCacheService: RedisCacheService) {}

	getSubscribedEntities(): EntityName<User>[] {
		return [User];
	}

	private async hashPassword(entity: User): Promise<void> {
		entity.password = await generateHash(entity.password);
	}

	async beforeCreate({ entity }: EventArgs<User>): Promise<void> {
		await this.hashPassword(entity);
	}

	async beforeUpdate({ entity, changeSet }: EventArgs<User>): Promise<void> {
		if (entity.password === changeSet.originalEntity.password) {
			return;
		}

		const isMatch = await compareHash(entity.password, changeSet.originalEntity.password);

		if (!isMatch) {
			await this.hashPassword(entity);
		} else {
			entity.password = changeSet.originalEntity.password;
		}
	}

	async afterCreate({ entity }: EventArgs<User>): Promise<void> {
		await this.redisCacheService.set(entity.id, entity);
	}

	async afterUpdate({ entity }: EventArgs<User>): Promise<void> {
		await this.redisCacheService.set(entity.id, entity);
	}

	async afterDelete({ entity }: EventArgs<User>): Promise<void> {
		await this.redisCacheService.del(entity.id);
	}
}
