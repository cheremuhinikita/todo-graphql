import React from 'react';
import { useParams } from 'react-router-dom';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';

import { Async } from '@components';
import { ID_KEY, USERS_KEY } from '@core/constants';
import { selectCrudHook } from '@core/utils/crud';
import { useCrudContext } from '@providers';

import { Todo } from '@modules/todo';

interface IParams {
	[ID_KEY]: string;
}

export const TodoListModal: React.FC = () => {
	const {
		findTodo: { execute, data, loading, error },
	} = useCrudContext(selectCrudHook(USERS_KEY));

	const { id } = useParams<IParams>();

	return (
		<>
			<DialogTitle id="form-dialog-title">ToDo</DialogTitle>
			<DialogContent dividers>
				<Async
					strictMode
					execute={() => execute(Number(id))}
					data={data}
					loading={loading}
					error={error}
				>
					<List>
						{data &&
							data.map((todo) => <Todo key={todo.id} full={false} model={todo} />)}
					</List>
				</Async>
			</DialogContent>
		</>
	);
};
