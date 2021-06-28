import { Global, Module } from '@nestjs/common';

import { EntityHelper } from '@common/helper';
import { DateScalar } from '@common/scalars';

@Global()
@Module({
	providers: [EntityHelper, DateScalar],
	exports: [EntityHelper],
})
export class CommonModule {}
