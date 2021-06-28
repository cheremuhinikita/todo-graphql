import { IsNotEmpty, IsString, Length } from '../decorators';

export class CreateOrUpdateTodoSchema {
	@IsNotEmpty()
	@IsString()
	@Length(6, 32)
	readonly title: string;

	@IsNotEmpty()
	@IsString()
	readonly description: string;
}
