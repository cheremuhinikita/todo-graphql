import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from '../decorators';
import { Role } from '../enums/role.enum';

export class CreateOrUpdateUserSchema {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	readonly username: string;

	@IsString()
	@Length(6, 32)
	readonly password: string;

	@IsEnum(Role)
	readonly role: Role;
}
