import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { useCrudContext } from '@providers';
import { Async } from '@components';
import { selectCrudHook } from '@core/utils/crud';
import { ICrudContext, IBaseFormProps, IBaseModel } from '@core/interfaces';
import { ID_KEY, MESSAGE_QUESTION_UPDATE } from '@core/constants';

interface IParams {
	[ID_KEY]: string;
}

interface IProps<T extends IBaseModel, U extends Record<string, unknown>> {
	hookKey: keyof ICrudContext;
	form: React.FC<IBaseFormProps<U>>;
	transformValues: (data: T) => Partial<U>;
}

export function BaseUpdateModal<T extends IBaseModel, U extends Record<string, unknown>>({
	hookKey,
	form: Form,
	transformValues,
}: IProps<T, U>): React.ReactElement {
	const history = useHistory();
	const {
		update: { execute: executeCreate },
		findOne: { execute: executeFindOne, data, loading, error },
	} = useCrudContext(selectCrudHook(hookKey));

	const { id } = useParams<IParams>();
	const handleUpdate = async (formValues: U): Promise<void> => {
		await (executeCreate as unknown as (id: number, formValues: U) => Promise<void>)(
			Number(id),
			formValues,
		);
		history.goBack();
	};

	return (
		<>
			<DialogTitle>Обновление</DialogTitle>
			<DialogContent dividers>
				<Async
					strictMode
					execute={() => executeFindOne(Number(id))}
					data={data}
					loading={loading}
					error={error}
				>
					{data && (
						<Form
							source={handleUpdate}
							buttonText="Обновить"
							defaultValues={transformValues(data as unknown as T)}
							confirmQuestion={MESSAGE_QUESTION_UPDATE}
						/>
					)}
				</Async>
			</DialogContent>
		</>
	);
}
