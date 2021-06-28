import React from 'react';

import { RecoveryPasswordSchema } from '@todo-graphql/common';

import Typography from '@material-ui/core/Typography';

import { ButtonSubmit, Form, TextField } from '@components';
import { useAuthContext } from '@providers';
import { useForm } from '@core/hooks';

import { RecoveryPasswordInput } from '@gql';
import useStyles from './styled';

interface IProps {
	handleNext: () => void;
}

export const RecoveryPassword: React.FC<IProps> = ({ handleNext }) => {
	const classes = useStyles();
	const { recoveryPassword } = useAuthContext();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isDisabled },
	} = useForm<RecoveryPasswordInput, boolean>({
		source: recoveryPassword,
		schema: RecoveryPasswordSchema,
	});

	const onSubmit = (data: boolean) => {
		if (data) handleNext();
	};

	return (
		<>
			<Typography variant="caption" align="left" className={classes.caption}>
				Сообщите нам свой адрес электронной почты, чтобы мы могли отправить вам ссылку для
				сброса
			</Typography>
			<Form
				isDisabled={isDisabled}
				onSubmit={handleSubmit(onSubmit)}
				className={classes.form}
			>
				<TextField
					fullWidth
					id="email"
					label="E-mail"
					name="email"
					autoComplete="email"
					control={control}
				/>
				<div className={classes.buttons}>
					<ButtonSubmit
						variant="contained"
						color="primary"
						isLoading={isSubmitting}
						className={classes.button}
					>
						Восстановить
					</ButtonSubmit>
				</div>
			</Form>
		</>
	);
};
