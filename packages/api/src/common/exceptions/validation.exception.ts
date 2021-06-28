import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { MESSAGE_ERROR_VALIDATION_ERROR } from '@todo-graphql/common';

import { mapValidationError } from '@common/utils';

export class ValidationException extends HttpException {
	constructor(errors: ValidationError[]) {
		super(
			{
				statusCode: HttpStatus.BAD_REQUEST,
				message: MESSAGE_ERROR_VALIDATION_ERROR,
				errors: errors.map(mapValidationError),
			},
			HttpStatus.BAD_REQUEST,
		);
	}
}
