import { theme } from '@core/theme';
import { makeStyles } from '@material-ui/core';

export default makeStyles({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		margin: theme.spacing(3, 0, 3),
	},
	wrapper: {
		display: 'grid',
		gridGap: 10,
	},
	paper: {
		width: 600,
	},
});
