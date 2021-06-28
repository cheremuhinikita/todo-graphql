import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	root: {
		position: 'relative',
	},
	bottom: {
		color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
	},
	top: {
		color: '#1a90ff',
		animationDuration: '800ms',
		position: 'absolute',
		left: 0,
	},
	circle: {
		strokeLinecap: 'round',
	},
}));
