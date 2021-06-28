import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
	form: {
		width: '100%',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		width: 145,
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));
