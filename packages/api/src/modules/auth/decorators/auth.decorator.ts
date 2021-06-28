import { applyDecorators, UseGuards } from '@nestjs/common';

import { Roles } from '@common/decorators/metadata';
import { Role } from '@common/enums';

import { RolesGuard, GqlAuthGuard } from '../guards';

export const Auth = (roles: Role[] = []): ClassDecorator & MethodDecorator =>
	applyDecorators(Roles(roles), UseGuards(GqlAuthGuard, RolesGuard));
