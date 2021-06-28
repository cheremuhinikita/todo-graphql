import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MikroORM } from '@mikro-orm/core';

import { ValidationException } from '@common/exceptions';

import { InitializerService } from '@modules/initializer/initializer.service';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors) => new ValidationException(errors),
		}),
	);

	const configService = app.get(ConfigService);
	const initializerService = app.get(InitializerService);
	const orm = app.get(MikroORM);

	const generator = orm.getSchemaGenerator();
	await generator.updateSchema();

	const port = +configService.get('API_PORT') || 3000;
	await initializerService.initializeAll();

	await app.listen(port);
	Logger.log(`Server is running on port ${port}`, 'Boostrap');
}
bootstrap();
