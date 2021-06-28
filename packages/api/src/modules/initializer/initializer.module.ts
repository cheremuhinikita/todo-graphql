import { Module } from '@nestjs/common';

import { UsersModule } from '@modules/users/users.module';

import { InitializerService } from './initializer.service';

@Module({
	imports: [UsersModule],
	providers: [InitializerService],
})
export class InitializerModule {}
