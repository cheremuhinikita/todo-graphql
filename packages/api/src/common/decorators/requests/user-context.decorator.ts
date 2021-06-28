import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { USER_CONTEXT_KEY } from '@common/constants/key.constants';

export const UserContext = createParamDecorator((data: string, context: ExecutionContext) => {
	const ctx = GqlExecutionContext.create(context);
	const req = ctx.getContext().req;
	const user = req[USER_CONTEXT_KEY];

	return data ? user?.[data] : user;
});
