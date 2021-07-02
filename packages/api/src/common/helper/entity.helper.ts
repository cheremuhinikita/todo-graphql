import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class EntityHelper {
	async checkEntity<T>(
		callback: () => Promise<T> | T,
		message = "Entity don't exist",
	): Promise<T> {
		const entity = await callback();

		if (!entity) throw new NotFoundException(message);

		return entity;
	}

	async checkValidEntity<T>(
		callback: () => Promise<T> | T,
		message = "Entity don't exist",
	): Promise<T> {
		const entity = await callback();

		if (!entity) throw new BadRequestException(message);

		return entity;
	}

	async checkUniqueEntity<T>(
		callback: () => Promise<T> | T,
		message = "Entity don't unique",
	): Promise<void> {
		const entity = await callback();

		if (entity) throw new BadRequestException(message);
	}

	async checkUniqueUpdateEntity<T, U extends keyof T>(
		callback: () => Promise<T> | T,
		column: Pick<T, U>,
		message = "Entity don't unique",
	): Promise<void> {
		const entity = await callback();
		const [[key, value]] = Object.entries<T[U]>(column);

		if (entity && entity[key] !== value) throw new BadRequestException(message);
	}
}
