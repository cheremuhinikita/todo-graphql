/* eslint-disable indent */
import React from 'react';
import { Controller, Control, Path } from 'react-hook-form';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MuiSelect, { SelectProps } from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

interface IProps<T extends Record<string, unknown>> extends SelectProps {
	name: Path<T>;
	control: Control<T>;
}

export const Select = <T extends Record<string, unknown>>({
	children,
	name,
	control,
	label,
	labelId,
	className,
	...props
}: IProps<T>): React.ReactElement => (
	<Controller
		name={name}
		control={control}
		render={({ field, fieldState: { error } }) => (
			<FormControl fullWidth variant="outlined" error={!!error} className={className}>
				<InputLabel id={labelId}>{label}</InputLabel>
				<MuiSelect {...field} {...props} labelId={labelId} label={label}>
					{children}
				</MuiSelect>
				{error?.message && <FormHelperText>{error.message}</FormHelperText>}
			</FormControl>
		)}
	/>
);
