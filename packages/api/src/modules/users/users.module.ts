import { forwardRef, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { TodoModule } from '@modules/todo/todo.module';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities';
import { UserSubscriber } from './subscribers';

@Module({
	imports: [forwardRef(() => TodoModule), MikroOrmModule.forFeature([User])],
	providers: [UsersResolver, UsersService, UserSubscriber],
	exports: [UsersService, UserSubscriber],
})
export class UsersModule {}
