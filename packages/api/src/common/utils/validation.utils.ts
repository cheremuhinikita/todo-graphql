import { ValidationError } from '@nestjs/common';

import { IRequestValidationError } from '@common/interfaces';

export const mapValidationError = ({
	property,
	constraints,
}: ValidationError): IRequestValidationError => ({
	property,
	error: Object.values(constraints).pop(),
});
