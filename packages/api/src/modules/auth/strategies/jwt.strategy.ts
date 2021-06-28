import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '@modules/users/users.service';
import { User } from '@modules/users/entities/user.entity';

import { IJwtPayload } from '@common/interfaces';
import { JWT_STRATEGY_KEY } from '@common/constants';
import { RedisCacheService } from '@common/modules/redis-cache/redis-cache.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_KEY) {
	constructor(
		private readonly usersService: UsersService,
		private readonly redisCacheService: RedisCacheService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_KEY,
		});
	}

	async validate({ userId }: IJwtPayload): Promise<User> {
		const user =
			(await this.redisCacheService.get<User>(userId)) ||
			(await this.usersService.findOneById(userId));
		if (!user) throw new UnauthorizedException('User not found');

		return user;
	}
}
