import { makeStyles } from '@material-ui/core';

export default makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		height: '100vh',
	},
	title: {
		marginTop: 20,
		fontSize: '3.2134rem',
		fontWeight: 600,
		textAlign: 'center',
	},
	description: {
		marginTop: 10,
		fontSize: '0.875rem',
		fontWeight: 500,
		textAlign: 'center',
	},
	button: {
		marginTop: 60,
	},
});
