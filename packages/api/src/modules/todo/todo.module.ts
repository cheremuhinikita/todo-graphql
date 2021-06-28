import { forwardRef, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { UsersModule } from '@modules/users/users.module';

import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { Todo } from './entities';

@Module({
	imports: [forwardRef(() => UsersModule), MikroOrmModule.forFeature([Todo])],
	providers: [TodoResolver, TodoService],
	exports: [TodoService],
})
export class TodoModule {}
