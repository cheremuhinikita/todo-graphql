/* eslint-disable indent */
import { ICrudContext } from '@core/interfaces';

export const selectCrudHook =
	<T extends keyof ICrudContext>(key: T) =>
	(ctx: ICrudContext): ICrudContext[T] =>
		ctx[key];
