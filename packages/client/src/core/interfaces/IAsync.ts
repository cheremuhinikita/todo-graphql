import { Nullable } from '@core/types';

export interface IAsync<T, U extends unknown[] = []> {
	execute: (...args: U) => Promise<void>;
	data: Nullable<T>;
	loading: boolean;
	error: unknown;
}
