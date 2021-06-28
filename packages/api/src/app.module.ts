import { Module } from '@nestjs/common';

import {
	CommonModule,
	ConfigRootModule,
	GraphQLRootModule,
	RedisCacheModule,
} from '@common/modules';

import { MikroOrmRootModule } from '@modules/mikro-orm/mikro-orm-root.module';
import { InitializerModule } from '@modules/initializer/initializer.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TodoModule } from '@modules/todo/todo.module';

@Module({
	imports: [
		ConfigRootModule,
		GraphQLRootModule,
		RedisCacheModule,
		CommonModule,
		MikroOrmRootModule,
		InitializerModule,
		UsersModule,
		AuthModule,
		TodoModule,
	],
})
export class AppModule {}
