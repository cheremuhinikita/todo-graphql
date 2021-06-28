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
	@LengthNumber(PASSWORD_CHANGE_CODE_LENGTH, {
		message: `Код должен состоять из ${PASSWORD_CHANGE_CODE_LENGTH} цифр`,
	})
	readonly passwordChangeCode: number;

	@IsNotEmpty()
	@IsString()
	@Length(6, 32)
	readonly password: string;

	@IsNotEmpty()
	@IsEqualTo('password', { message: 'Пароли не совпадают' })
	readonly passwordConfirm: string;
}
