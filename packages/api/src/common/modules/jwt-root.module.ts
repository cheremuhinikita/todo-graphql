import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const JwtRootModule = JwtModule.registerAsync({
	imports: [ConfigModule],
	useFactory: (configService: ConfigService) => ({
		secret: configService.get('JWT_SECRET_KEY'),
		signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
	}),
	inject: [ConfigService],
});
