import { ErrorCodes } from '@core/enums';
import { ExcludedErrorCodes } from '@core/types';

type Errors = Record<
	ExcludedErrorCodes,
	{
		title: string;
		description: string;
	}
>;

const ERROR_DESCRIPTION =
	'Вы либо попробовали какой-то сомнительный маршрут, либо пришли сюда по ошибке. Что бы это ни было, попробуйте воспользоваться навигацией.';

export const ERRORS: Errors = {
	[ErrorCodes.InternalServerError]: {
		title: 'Внутренняя ошибка сервера',
		description: ERROR_DESCRIPTION,
	},
	[ErrorCodes.NotFound]: {
		title: 'Страницы, которую вы ищете, здесь нет',
		description: ERROR_DESCRIPTION,
	},
	[ErrorCodes.Forbidden]: {
		title: 'Доступ запрещен',
		description: ERROR_DESCRIPTION,
	},
	[ErrorCodes.Unauthorized]: {
		title: 'Требуется авторизация',
		description: ERROR_DESCRIPTION,
	},
};
