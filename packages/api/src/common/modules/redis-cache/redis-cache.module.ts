import { Module, CacheModule, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { RedisCacheService } from './redis-cache.service';

@Global()
@Module({
	imports: [
		CacheModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				store: redisStore,
				host: configService.get('REDIS_HOST'),
				port: configService.get('REDIS_PORT'),
				ttl: +configService.get('CACHE_TTL'),
				max: +configService.get('MAX_ITEM_IN_CACHE'),
			}),
			inject: [ConfigService],
		}),
	],
	providers: [RedisCacheService],
	exports: [RedisCacheService],
})
export class RedisCacheModule {}
