import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUser, RegisterUser } from './validations';
import { firstValueFrom } from 'rxjs';

import { Error, JwtPayload } from 'src/types';
import { SERVICES } from 'src/utils/constants';
import { LoginTCP, RegisterTCP } from './types';
import { RefreshAuthGuard } from 'src/guards/refresh-auth.guard';
import { RefreshTCP } from './types/Refresh';

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
			console.error('<-- ERROR --> [AUTH REGISTER]:', error)
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
			console.log('<-- ERROR --> [AUTH LOGIN]:', error);
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}


	@Post('refresh')
	@UseGuards(RefreshAuthGuard)
	async refresh(@Request() req: { user: JwtPayload }) {
		console.log(`[API GATEWAY]: Refresh Token request ${req.user.sub}`);

		try {
			const observable = this.authClient.send<RefreshTCP>('auth-refresh', req.user.sub);
			return await firstValueFrom(observable);
		}catch(err) {
			const error = err as Error;
			console.log('<-- ERROR --> [AUTH REFRESH]:', error);
			throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
		}
	}
}
