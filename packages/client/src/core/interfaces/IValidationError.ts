import { Path } from 'react-hook-form';

export interface IValidationError<T> {
	property: Path<T>;
	error: string;
}
