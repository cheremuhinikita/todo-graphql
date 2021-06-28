import { IsNotEmpty, IsString, Length } from '../decorators';

export class LoginSchema {
	@IsNotEmpty()
	@IsString()
	@Length(2, 32)
	readonly username: string;

	@IsNotEmpty()
	@IsString()
	@Length(6, 32)
	readonly password: string;
}
