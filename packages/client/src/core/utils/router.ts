/* eslint-disable indent */
import { ErrorCodes, PageUrls } from '@core/enums';

interface Location {
	pathname: string;
}

export const makeUrl = (...strings: string[]): string => strings.join('/');
export const makeParam = (str: string): string => `:${str}`;
export const makeUrlModal =
	(...strings: string[]) =>
	(location: Location): string =>
		makeUrl(location.pathname, ...strings);

export const relocationOnError = (code: ErrorCodes): void => {
	window.location.href = makeUrl(PageUrls.error, code);
};
