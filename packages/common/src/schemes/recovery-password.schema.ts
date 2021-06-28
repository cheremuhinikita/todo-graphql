import { IsEmail, IsNotEmpty } from '../decorators';

export class RecoveryPasswordSchema {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;
}
