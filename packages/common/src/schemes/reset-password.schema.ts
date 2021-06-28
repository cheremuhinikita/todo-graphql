import { PASSWORD_CHANGE_CODE_LENGTH } from '../constants';
import {
	IsEmail,
	IsEqualTo,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsString,
	Length,
	LengthNumber,
} from '../decorators';

export class ResetPasswordSchema {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@IsNumber()
	@IsInt()
	@LengthNumber(PASSWORD_CHANGE_CODE_LENGTH)
	readonly passwordChangeCode: number;

	@IsNotEmpty()
	@IsString()
	@Length(6, 32)
	readonly password: string;

	@IsNotEmpty()
	@IsEqualTo('password')
	readonly passwordConfirm: string;
}
