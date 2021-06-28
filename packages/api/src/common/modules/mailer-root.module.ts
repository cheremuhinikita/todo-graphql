import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const MailerRootModule = MailerModule.forRootAsync({
	imports: [ConfigModule],
	useFactory: (configService: ConfigService) => ({
		transport: {
			host: configService.get('NODEMAILER_HOST'),
			port: configService.get('NODEMAILER_PORT'),
			auth: {
				user: configService.get('NODEMAILER_USER'),
				pass: configService.get('NODEMAILER_PASSWORD'),
			},
		},
		defaults: {
			from: '"nest-modules" <user@outlook.com>',
		},
		template: {
			options: {
				strict: true,
			},
		},
	}),
	inject: [ConfigService],
});
