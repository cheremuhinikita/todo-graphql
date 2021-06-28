import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		width: 110,
		margin: theme.spacing(3, 0, 2),
	},
	select: {
		margin: theme.spacing(1, 0),
	},
}));
