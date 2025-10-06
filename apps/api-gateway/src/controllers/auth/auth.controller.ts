import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUser, RegisterUser } from './validations';
import { firstValueFrom } from 'rxjs';

import { Error, JwtPayload } from 'src/types';
import { SERVICES } from 'src/utils/Constants';
import { RefreshAuthGuard } from 'src/guards/refresh-auth.guard';
import { LoginResponse, RegisterResponse, RefreshResponse } from './types';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
@ApiBadRequestResponse({description: 'Requisição falhou. Campo `message` detalhe o problema'})
export class AuthController {
	constructor(@Inject(SERVICES.AUTH) private authClient: ClientProxy) {}


	@Post('register')
	@ApiOperation({ summary: 'Registra um usuário no sistema' })
	@ApiCreatedResponse({description: 'Usuário criado com sucesso'})
	async register(@Body() body: RegisterUser) {
		console.log(`[API GATEWAY]: Register request ${body.username}`);

		try {
			const observable = this.authClient.send<RegisterResponse>('auth-register', body);
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error;
			console.error('<-- ERROR --> [AUTH REGISTER]:', error)
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}


	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: 'Valida informações e loga um usuário no sistema'})
	@ApiOkResponse({description: 'Usuário logado com sucesso', type: LoginResponse})
	@ApiUnauthorizedResponse({description: 'Usuário não autorizado.'})
	async login(@Body() body: LoginUser) {
		console.log(`[API GATEWAY]: Login request ${body.username}`);

		try {
			const observable = this.authClient.send<LoginResponse>('auth-login', body);
			return await firstValueFrom(observable);
		} catch(err) {
			const error = err as Error;
			console.log('<-- ERROR --> [AUTH LOGIN]:', error);
			throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
		}
	}


	@Post('refresh')
	@UseGuards(RefreshAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({summary: 'Gera um novo token de acesso'})
	@ApiOkResponse({description: 'Novo token gerado com sucesso', type: RefreshResponse})
	@ApiUnauthorizedResponse({description: 'Usuário não autorizado.'})
	async refresh(@Request() req: { user: JwtPayload }) {
		console.log(`[API GATEWAY]: Refresh Token request ${req.user.sub}`);

		try {
			const observable = this.authClient.send<RefreshResponse>('auth-refresh', req.user.sub);
			return await firstValueFrom(observable);
		}catch(err) {
			const error = err as Error;
			console.log('<-- ERROR --> [AUTH REFRESH]:', error);
			throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
		}
	}
}
