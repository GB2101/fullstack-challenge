import { Controller } from '@nestjs/common';
import { AuthService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginUser, RegisterUser } from './validations';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@MessagePattern('auth-register')
	async register(body: RegisterUser){
		console.log(`[AUTH SERVICE]: Register request ${body.username}`);

		await this.authService.create(body);
		return { success: true };
	}

	@MessagePattern('auth-login')
	async login(body: LoginUser) {
		console.log(`[AUTH SERVICE]: Login request ${body.username}`);
		return await this.authService.login(body);
	}
}
