import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useCrudContext } from '@providers';
import { Async, Modal } from '@components';
import { makeParam, makeUrl, selectCrudHook } from '@core/utils';
import {
	IBaseAddActionsProps,
	IBaseCardProps,
	IBaseFormProps,
	IBaseModel,
	ICrudContext,
} from '@core/interfaces';
import { Actions } from '@core/types';
import { ModalUrls, PageUrls } from '@core/enums';
import { ID_KEY } from '@core/constants';

import { RolesGuard } from '@modules/auth';

import { BaseCard, BaseCreateModal, BaseUpdateModal } from './components';
import useStyles from './styled';

interface IProps<T extends IBaseModel, U extends Record<string, unknown>> {
	children?: React.ReactNode;
	title: string;
	hookKey: keyof ICrudContext;
	actions: Actions;
	pageUrl: PageUrls;
	transformValues: (result: T) => Partial<U>;
	card: React.FC<IBaseCardProps<T>>;
	form: React.FC<IBaseFormProps<U>>;
	addActions?: React.FC<IBaseAddActionsProps<T>>;
}

export function Crud<T extends IBaseModel, U extends Record<string, unknown>>({
	children,
	title,
	hookKey,
	actions,
	pageUrl,
	transformValues,
	card: Card,
	form: Form,
	addActions: AddActions,
}: IProps<T, U>): React.ReactElement {
	const classes = useStyles();
	const {
		findAll: { data, ...restFindAll },
		remove: { execute: executeRemove, loading: loadingRemove },
	} = useCrudContext(selectCrudHook(hookKey));

	const createPath = makeUrl(pageUrl, ModalUrls.create);
	const updatePath = makeUrl(pageUrl, makeParam(ID_KEY), ModalUrls.update);

	return (
		<div>
			<div className={classes.header}>
				<Typography component="h1" variant="h2" className={classes.title}>
					{title}
				</Typography>
				<RolesGuard roles={actions.create}>
					<Button size="small" variant="contained" component={RouterLink} to={createPath}>
						Создать
					</Button>
				</RolesGuard>
			</div>
			<RolesGuard roles={actions.read}>
				<Async {...restFindAll} data={data} className={classes.wrapper}>
					{data &&
						(data as unknown as T[]).map((model) => (
							<BaseCard
								key={model.id}
								isLoadingRemove={loadingRemove}
								id={model.id}
								model={model}
								actions={actions}
								component={Card}
								addActions={AddActions}
								onRemove={executeRemove}
							/>
						))}
				</Async>
			</RolesGuard>
			<RolesGuard roles={actions.create}>
				<Modal
					confirmClose
					scroll="paper"
					path={createPath}
					classes={{
						paper: classes.paper,
					}}
				>
					<BaseCreateModal hookKey={hookKey} form={Form} />
				</Modal>
			</RolesGuard>
			<RolesGuard roles={actions.update}>
				<Modal
					confirmClose
					scroll="paper"
					path={updatePath}
					classes={{
						paper: classes.paper,
					}}
				>
					<BaseUpdateModal
						hookKey={hookKey}
						form={Form}
						transformValues={transformValues}
					/>
				</Modal>
			</RolesGuard>
			{children}
		</div>
	);
}
