import { ConfigModule } from '@nestjs/config';

export const ConfigRootModule = ConfigModule.forRoot({
	envFilePath: process.env.ENV_PATH,
});
