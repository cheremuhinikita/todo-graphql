import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	toolbar: {
		paddingRight: 24,
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	toolbarMenuButton: {
		marginRight: 36,
	},
	toolbarMenuButtonHidden: {
		display: 'none',
	},
	toolbarActions: {
		marginLeft: 'auto',
		marginRight: 0,
	},
}));
