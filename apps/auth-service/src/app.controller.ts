import { Controller } from '@nestjs/common';
import { AuthService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import type { LoginUser, RegisterUser } from './validations';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@MessagePattern('auth-register')
	async register(data: RegisterUser){
		console.log(`[AUTH SERVICE]: Register request ${data.username}`);
		await this.authService.create(data);
		return { success: true };
	}

	@MessagePattern('auth-login')
	async login(data: LoginUser) {
		console.log(`[AUTH SERVICE]: Login request ${data.username}`);
		return await this.authService.login(data);
	}

	@MessagePattern('auth-refresh')
	async refresh(username: string) {
		console.log(`[AUTH SERVICE]: Refresh request ${username}`);
		const token = await this.authService.refresh(username);
		return { token };
	}

	@MessagePattern('users-list')
	async users() {
		console.log('[AUTH SERVICE]: List Users');
		return await this.authService.users();
	}
}
