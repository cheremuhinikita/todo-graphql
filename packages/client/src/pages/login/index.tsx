import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { LoginSchema } from '@todo-graphql/common';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useAuthContext } from '@providers';

import { ButtonSubmit, Form, Link, TextField } from '@components';
import { PageUrls } from '@core/enums';
import { useForm } from '@core/hooks';

import { LoginInput } from '@gql';

import useStyles from './styled';

export const LoginPage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const { login } = useAuthContext();

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isDisabled },
	} = useForm<LoginInput, void>({
		source: login,
		schema: LoginSchema,
	});

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Вход
				</Typography>
				<Form isDisabled={isDisabled} onSubmit={handleSubmit()} className={classes.form}>
					<TextField
						autoFocus
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
						name="password"
						autoComplete="current-password"
						control={control}
					/>
					<ButtonSubmit
						fullWidth
						variant="contained"
						color="primary"
						disabled={isDisabled}
						isLoading={isSubmitting}
						className={classes.submit}
					>
						Войти
					</ButtonSubmit>
					<Grid container>
						<Grid item xs>
							<Link to={PageUrls.recoveryPassword} variant="body2">
								Забыли пароль?
							</Link>
						</Grid>
						<Grid item>
							<Link to={PageUrls.register} variant="body2">
								Еще не зарегистрированы?
							</Link>
						</Grid>
					</Grid>
				</Form>
			</div>
		</Container>
	);
};
