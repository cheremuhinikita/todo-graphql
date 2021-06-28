/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Nullable } from '@core/types';
import { IAsync } from '@core/interfaces';
import { noopFn } from '@core/utils';

interface IUseAsyncOptions<T> {
	onSuccess?: (data: T) => Promise<void> | void;
	onError?: (err: unknown) => void;
}

const defaultOptions = {
	onSuccess: noopFn,
	onError: noopFn,
};

export const useAsync = <T, U extends unknown[] = []>(
	callback: (...args: U) => Promise<T>,
	{ onSuccess, onError }: IUseAsyncOptions<T> = defaultOptions,
): IAsync<T, U> => {
	const [data, setData] = React.useState<Nullable<T>>(null);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<unknown>(null);

	const execute = React.useCallback(
		async (...args: U) => {
			try {
				setLoading(true);
				const response = await callback(...args);
				setData(response);
				if (onSuccess) onSuccess(response);
			} catch (err) {
				setError(err);
				if (onError) onError(err);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[callback],
	);

	return { error, data, loading, execute };
};
