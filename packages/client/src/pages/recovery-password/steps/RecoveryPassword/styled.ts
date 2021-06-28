import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
	caption: {
		marginBottom: theme.spacing(1),
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
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
