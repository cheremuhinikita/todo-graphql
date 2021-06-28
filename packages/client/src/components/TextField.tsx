/* eslint-disable indent */
import React from 'react';
import { Control, Controller, Path } from 'react-hook-form';

import MuiTextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';

interface IProps<T extends Record<string, unknown>>
	extends Omit<OutlinedTextFieldProps, 'name' | 'variant'> {
	name: Path<T>;
	control: Control<T>;
	transform?: (value: string) => unknown;
}

const defaultTransform = (value: string): string => value;

export const TextField = <T extends Record<string, unknown>>({
	name,
	control,
	error,
	margin = 'normal',
	transform = defaultTransform,
	...props
}: IProps<T>): React.ReactElement => {
	const handleChange =
		(changeFn: (...args: unknown[]) => void) =>
		(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			const transformedValue = transform(event.target.value);
			changeFn(transformedValue);
		};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, ...restField }, fieldState: { error: fieldError } }) => (
				<MuiTextField
					{...restField}
					{...props}
					onChange={handleChange(onChange)}
					variant="outlined"
					margin={margin}
					error={error || !!fieldError}
					helperText={fieldError?.message}
				/>
			)}
		/>
	);
};
