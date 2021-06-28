import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date: string, formatStr = 'PP'): string =>
	format(new Date(date), formatStr, {
		locale: ru,
	});
