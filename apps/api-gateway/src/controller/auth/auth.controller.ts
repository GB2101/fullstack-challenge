import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from 'src/constants';
import { LoginUser, RegisterUser } from './validations';
import { firstValueFrom } from 'rxjs';
import { Error } from 'src/types';
import { LoginTCP, RegisterTCP } from './types';

@Controller('auth')
export class AuthController {
	constructor(@Inject(SERVICES.AUTH) private authClient: ClientProxy) {}

	@Post('register')
	async register(@Body() body: RegisterUser) {
		console.log(`[API GATEWAY]: Register request ${body.username}`);

		try {
			const observable = this.authClient.send<RegisterTCP>('auth-register', body);
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as { message: string } ;
			console.log('[AUTH REGISTER]:', error)
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() body: LoginUser) {
		console.log(`[API GATEWAY]: Login request ${body.username}`);

		try {
			const observable = this.authClient.send<LoginTCP>('auth-login', body);
			return await firstValueFrom(observable);
		} catch(err) {
			const error = err as Error;
			console.log('[AUTH LOGIN]:', error);
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
