import { Injectable } from '@nestjs/common';

import { UsersService } from '@modules/users/users.service';

import { DATA_USERS } from './data';

@Injectable()
export class InitializerService {
	constructor(private readonly usersService: UsersService) {}

	public async initializeAll(): Promise<void> {
		await this.initializeUsers();
	}

	private async initializeUsers(): Promise<void> {
		for (const user of DATA_USERS) {
			const existUser = await this.usersService.findOneByEmail(user.email);
			if (!existUser) await this.usersService.create(user);
		}
	}
}
