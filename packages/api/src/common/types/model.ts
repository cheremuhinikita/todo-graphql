import { IBaseModel } from '@common/interfaces';

export type OmitBaseModel<T extends IBaseModel, K extends keyof T> = Omit<T, keyof IBaseModel | K>;
