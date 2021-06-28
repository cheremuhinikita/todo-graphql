import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Role } from '@common/enums/role.enum';
import { ROLES_KEY, USER_CONTEXT_KEY } from '@common/constants/key.constants';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!roles || roles.length === 0) {
			return true;
		}

		const ctx = GqlExecutionContext.create(context);
		const req = ctx.getContext().req;
		const user = req[USER_CONTEXT_KEY];

		return roles.includes(user.role);
	}
}
