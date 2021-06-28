import { OmitBaseModel } from '@common/types';

import { ITodo } from './interfaces';

export type CreateOrUpdateTodo = OmitBaseModel<ITodo, 'user'>;
