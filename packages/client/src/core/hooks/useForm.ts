/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useForm as useHookForm,
	UnpackNestedValue,
	UseFormProps,
	UseFormReturn,
	FieldValues,
	UseFormStateReturn,
} from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ClassConstructor } from 'class-transformer';
import { ErrorResponse } from '@apollo/client/link/error';

import { mapGqlErrors } from '@core/apollo/utils';
import { matchesErrorHandler, validationFailedHandler } from '@core/errorHandling';
import { IValidationError } from '@core/interfaces';

type Handler<T> = (data: T) => void;

type Schema = {
	[_: string]: any;
};

interface IUseFormProps<
	T extends FieldValues = FieldValues,
	U = Record<string, unknown>,
	S = Schema,
> extends Omit<UseFormProps<T>, 'resolver'> {
	source: (data: UnpackNestedValue<T>) => Promise<U> | U;
	schema: ClassConstructor<S>;
}

interface IFormStateReturn<T> extends UseFormStateReturn<T> {
	isDisabled: boolean;
}

interface IUseFormReturn<T, U> extends Omit<UseFormReturn<T>, 'handleSubmit' | 'formState'> {
	formState: IFormStateReturn<T>;
	handleSubmit: (handler?: Handler<U>) => () => Promise<void>;
}

export const useForm = <T extends FieldValues = FieldValues, U = Record<string, unknown>>({
	schema,
	source,
	mode = 'onChange',
	...props
}: IUseFormProps<T, U>): IUseFormReturn<T, U> => {
	const {
		handleSubmit: submit,
		setError,
		formState: { isDirty, isValid, ...restFormState },
		...results
	} = useHookForm<T>({
		...props,
		mode,
		resolver: classValidatorResolver(schema),
	});

	const isDisabled = !isDirty || !isValid;

	const onSubmit = (handler?: Handler<U>) => {
		return async (data: UnpackNestedValue<T>): Promise<void> => {
			try {
				const result = await source(data);
				if (handler) handler(result);
			} catch (err) {
				const callback = ({ property, error }: IValidationError<T>) => {
					setError(property, { message: error });
				};

				mapGqlErrors(err as ErrorResponse, (response) =>
					matchesErrorHandler(validationFailedHandler, response, callback),
				);
			}
		};
	};

	const handleSubmit = (handler?: Handler<U>) => submit(onSubmit(handler));

	return {
		...results,
		setError,
		handleSubmit,
		formState: {
			isDisabled,
			isDirty,
			isValid,
			...restFormState,
		},
	};
};
