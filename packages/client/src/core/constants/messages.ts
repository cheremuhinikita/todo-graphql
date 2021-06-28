import {
	MESSAGE_ERROR_INVALID_EMAIL,
	MESSAGE_ERROR_INVALID_PASSWORD,
	MESSAGE_ERROR_INVALID_PASSWORD_CHANGE_TOKEN,
	MESSAGE_ERROR_INVALID_USERNAME,
	MESSAGE_ERROR_UNIQUE_EMAIL,
	MESSAGE_ERROR_UNIQUE_USERNAME,
	MESSAGE_ERROR_VALIDATION_ERROR,
} from '@todo-graphql/common';

export const MESSAGE_ERROR_DEFAULT = 'Произошла ошибка';

export const SERVER_ERRORS_MESSAGES = {
	[MESSAGE_ERROR_UNIQUE_EMAIL]: 'Пользователь с таким e-mail уже сущесвует',
	[MESSAGE_ERROR_UNIQUE_USERNAME]: 'Пользователь с таким именем уже существует',
	[MESSAGE_ERROR_INVALID_USERNAME]: 'Неправильное имя пользователя',
	[MESSAGE_ERROR_INVALID_PASSWORD]: 'Неправильный пароль',
	[MESSAGE_ERROR_INVALID_EMAIL]: 'Неправильный e-mail',
	[MESSAGE_ERROR_VALIDATION_ERROR]: 'Возникла ошибка при валидации формы',
	[MESSAGE_ERROR_INVALID_PASSWORD_CHANGE_TOKEN]: 'Неправильный код сброса пароля',
} as const;

export const MESSAGE_SUCCESS_REGISTER = 'Вы успешно зарегистировались';
export const MESSAGE_SUCCESS_RECOVERY_PASSWORD = 'Вы успешно сбросили пароль';

export const MESSAGE_QUESTION_CREATE = 'Вы действильно хотите создать?';
export const MESSAGE_QUESTION_UPDATE = 'Вы действильно хотите обновить?';
export const MESSAGE_QUESTION_DELETE = 'Вы действильно хотите удалить?';
export const MESSAGE_QUESTION_EXIT = 'Вы действильно хотите закрыть?';

export const MESSAGE_SUCCESS_CREATE_USER = 'Вы успешно создали нового пользователя';
export const MESSAGE_SUCCESS_UPDATE_USER = 'Вы успешно обновили пользователя';
export const MESSAGE_SUCCESS_DELETE_USER = 'Вы успешно удалили пользователя';

export const MESSAGE_SUCCESS_CREATE_TODO = 'Вы успешно создали новую ToDo';
export const MESSAGE_SUCCESS_UPDATE_TODO = 'Вы успешно обновили ToDo';
export const MESSAGE_SUCCESS_DELETE_TODO = 'Вы успешно удалили ToDo';
