import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { JwtRootModule, MailerRootModule } from '@common/modules';

import { UsersModule } from '@modules/users/users.module';

import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies';

@Module({
	imports: [PassportModule, JwtRootModule, MailerRootModule, ConfigModule, UsersModule],
	providers: [AuthResolver, JwtStrategy],
})
export class AuthModule {}
