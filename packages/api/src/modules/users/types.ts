import { OmitBaseModel } from '@common/types';

import { IUser } from './interfaces';

export type CreateOrUpdateUser = OmitBaseModel<IUser, 'passwordChangeCode' | 'todo'>;
