import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';

import { MESSAGE_QUESTION_EXIT } from '@core/constants';
import { useConfirmDialogContext } from '@providers';

interface IProps extends Omit<DialogProps, 'open' | 'onClose'> {
	children: React.ReactNode;
	confirmClose?: boolean;
	path: string;
}

export const Modal: React.FC<IProps> = ({ children, confirmClose = false, path, ...props }) => {
	const history = useHistory();
	const confirmDialog = useConfirmDialogContext();

	const handleClose = () => {
		if (confirmClose) {
			confirmDialog(MESSAGE_QUESTION_EXIT, {
				onAgree: () => history.goBack(),
			});
		} else {
			history.goBack();
		}
	};

	return (
		<Route path={path}>
			{({ match }) => (
				<Dialog {...props} open={Boolean(match)} onClose={handleClose}>
					{Boolean(match) && children}
				</Dialog>
			)}
		</Route>
	);
};
