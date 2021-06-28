import { IsNotEmpty, IsEmail, IsString, Length } from '../decorators';

export class RegisterSchema {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	@Length(2, 32)
	readonly username: string;

	@IsNotEmpty()
	@IsString()
	@Length(6, 32)
	readonly password: string;
}
