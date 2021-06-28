import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

import { JWT_STRATEGY_KEY, USER_CONTEXT_KEY } from '@common/constants';

@Injectable()
export class GqlAuthGuard extends AuthGuard(JWT_STRATEGY_KEY) {
	getRequest(context: ExecutionContext): unknown {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}

	getAuthenticateOptions(): IAuthModuleOptions {
		return {
			property: USER_CONTEXT_KEY,
		};
	}
}
