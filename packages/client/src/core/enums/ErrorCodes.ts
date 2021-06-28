export enum ErrorCodes {
	InternalServerError = '500',
	NotFound = '404',
	Forbidden = '403',
	Unauthorized = '401',
	BadRequest = '400',
}

export enum ErrorCodesNumbers {
	InternalServerError = Number(ErrorCodes.InternalServerError),
	NotFound = Number(ErrorCodes.NotFound),
	Forbidden = Number(ErrorCodes.Forbidden),
	Unauthorized = Number(ErrorCodes.Unauthorized),
	BadRequest = Number(ErrorCodes.BadRequest),
}
