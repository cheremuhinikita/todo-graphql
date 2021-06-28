import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useConfirmDialogContext } from '@providers';
import { ModalUrls } from '@core/enums';
import { IBaseAddActionsProps, IBaseCardProps, IBaseModel } from '@core/interfaces';
import { makeUrlModal } from '@core/utils';
import { Actions } from '@core/types';
import { MESSAGE_QUESTION_DELETE } from '@core/constants';

import { RolesGuard } from '@modules/auth';

import useStyles from './styled';

interface IProps<T extends IBaseModel> {
	isLoadingRemove: boolean;
	id: number;
	model: T;
	actions: Actions;
	component: React.FC<IBaseCardProps<T>>;
	addActions?: React.FC<IBaseAddActionsProps<T>>;
	onRemove: (id: number) => Promise<void>;
}

export function BaseCard<T extends IBaseModel>({
	isLoadingRemove,
	id,
	model,
	actions,
	component: Component,
	addActions: AddActions,
	onRemove,
}: IProps<T>): React.ReactElement {
	const classes = useStyles();
	const confirmDialog = useConfirmDialogContext();
	const [isRemove, setIsRemove] = React.useState<boolean>(false);

	const handleRemove = (): void => {
		const onAgree = async () => {
			try {
				setIsRemove(true);
				await onRemove(id);
			} finally {
				setIsRemove(false);
			}
		};

		confirmDialog(MESSAGE_QUESTION_DELETE, {
			onAgree,
		});
	};

	return (
		<Card className={classes.root}>
			<Component component={CardContent} model={model} />
			<Divider />
			<CardActions>
				{AddActions && <AddActions model={model} />}
				<RolesGuard roles={actions.update}>
					<Button
						size="small"
						variant="contained"
						component={RouterLink}
						to={makeUrlModal(id.toString(), ModalUrls.update)}
						className={classes.button}
					>
						Изменить
					</Button>
				</RolesGuard>
				<RolesGuard roles={actions.delete}>
					<Button
						size="small"
						variant="text"
						onClick={handleRemove}
						className={classes.button}
					>
						{isRemove && isLoadingRemove ? <CircularProgress size={24} /> : 'Удалить'}
					</Button>
				</RolesGuard>
			</CardActions>
		</Card>
	);
}
