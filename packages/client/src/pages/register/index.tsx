import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RegisterSchema } from '@todo-graphql/common';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { ButtonSubmit, Form, Link, TextField } from '@components';
import { useAuthContext } from '@providers';
import { useForm } from '@core/hooks';
import { PageUrls } from '@core/enums';

import { RegisterInput } from '@gql';

import useStyles from './styled';

export const RegisterPage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const { register: registerAuth } = useAuthContext();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isDisabled },
	} = useForm<RegisterInput, void>({
		source: registerAuth,
		schema: RegisterSchema,
	});

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Регистрация
				</Typography>
				<Form isDisabled={isDisabled} onSubmit={handleSubmit()} className={classes.form}>
					<Grid container spacing={2}>
						<TextField
							autoFocus
							fullWidth
							id="email"
							label="E-mail"
							autoComplete="email"
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
							type="password"
							label="Пароль"
							margin="normal"
							name="password"
							control={control}
						/>
					</Grid>
					<ButtonSubmit
						fullWidth
						variant="contained"
						color="primary"
						disabled={isDisabled}
						isLoading={isSubmitting}
						className={classes.submit}
					>
						зарегистрироваться
					</ButtonSubmit>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to={PageUrls.login} variant="body2">
								Уже зарегистрированы?
							</Link>
						</Grid>
					</Grid>
				</Form>
			</div>
		</Container>
	);
};
