import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { stringToBoolean } from '@common/utils';

import { UsersModule } from '@modules/users/users.module';
import { UserSubscriber } from '@modules/users/subscribers';

export const MikroOrmRootModule = MikroOrmModule.forRootAsync({
	imports: [ConfigModule, UsersModule],
	useFactory: (configService: ConfigService, userSubscriber: UserSubscriber) => {
		const logger = new Logger('MikroORM');
		const isLogging = stringToBoolean(configService.get('MIKROORM_LOGGING'));

		return {
			type: 'postgresql',
			autoLoadEntities: true,
			subscribers: [userSubscriber],
			host: configService.get('POSTGRES_HOST'),
			port: +configService.get('POSTGRES_PORT'),
			user: configService.get('POSTGRES_USER'),
			password: configService.get('POSTGRES_PASSWORD'),
			dbName: configService.get('POSTGRES_DB'),
			debug: stringToBoolean(configService.get('MIKROORM_DEBUG')),
			logger: isLogging && logger.log.bind(logger),
		};
	},
	inject: [ConfigService, UserSubscriber],
});
