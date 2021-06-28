import React from 'react';
import { CreateOrUpdateUserSchema } from '@todo-graphql/common';
import { CreateOrUpdateUserInput } from '@gql';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import { ButtonSubmit, Form, Select, TextField } from '@components';
import { useForm } from '@core/hooks';
import { IBaseFormProps } from '@core/interfaces';
import { Role } from '@core/enums';

import useStyles from './styled';

type Props = IBaseFormProps<CreateOrUpdateUserInput>;

export const UserForm: React.FC<Props> = ({
	source,
	defaultValues,
	buttonText,
	confirmQuestion,
}) => {
	const classes = useStyles();

	const {
		control,
		handleSubmit,
		formState: { isDisabled, isSubmitting },
	} = useForm<CreateOrUpdateUserInput, void>({
		source,
		schema: CreateOrUpdateUserSchema,
		defaultValues,
	});

	return (
		<Form
			confirmSubmit
			isDisabled={isDisabled}
			confirmQuestion={confirmQuestion}
			onSubmit={handleSubmit()}
			className={classes.form}
		>
			<Grid container spacing={2} justify="flex-end">
				<TextField
					autoFocus
					fullWidth
					id="email"
					label="E-mail"
					name="email"
					control={control}
				/>
				<TextField
					fullWidth
					id="username"
					label="Имя пользователя"
					name="username"
					control={control}
				/>
				<TextField
					fullWidth
					id="password"
					label="Пароль"
					type="password"
					name="password"
					control={control}
				/>
				<Select
					name="role"
					label="Роль"
					labelId="role"
					control={control}
					className={classes.select}
				>
					<MenuItem value={Role.USER}>Пользователь</MenuItem>
					<MenuItem value={Role.ADMIN}>Админ</MenuItem>
				</Select>
				<ButtonSubmit
					variant="contained"
					color="primary"
					disabled={isDisabled}
					isLoading={isSubmitting}
					className={classes.submit}
				>
					{buttonText}
				</ButtonSubmit>
			</Grid>
		</Form>
	);
};
