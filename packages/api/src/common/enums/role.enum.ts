import { registerEnumType } from '@nestjs/graphql';
import { Role } from '@todo-graphql/common';

registerEnumType(Role, {
	name: 'Role',
});

export { Role };
