import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	loader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		margin: theme.spacing(3, 0),
	},
}));
