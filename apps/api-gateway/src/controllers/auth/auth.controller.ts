import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import { Proxy, ProxyOptions } from 'src/utils';
import { SERVICES } from 'src/utils/Constants';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LoginUser, RegisterUser, RefreshUser } from './validations';
import { TokenResponse, RegisterResponse, UserResponse } from './types';

@ApiTags('Autenticação')
@Controller('auth')
@ApiBadRequestResponse({description: 'Requisição falhou. Campo `message` detalhe o problema'})
export class AuthController {
	private authProxy: Proxy;
	constructor(@Inject(SERVICES.AUTH) private authClient: ClientProxy) {
		this.authProxy = new Proxy(this.authClient, 'auth');
	}


	@Post('register')
	@ApiOperation({ summary: 'Registra um usuário no sistema' })
	@ApiCreatedResponse({description: 'Usuário criado com sucesso'})
	async register(@Body() body: RegisterUser) {
		console.log(`[API GATEWAY]: Register User request ${body.username}`);
		return await this.authProxy.send<RegisterResponse, RegisterUser>('auth-register', body, {op: 'register'});
	}


	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: 'Valida informações e loga um usuário no sistema'})
	@ApiOkResponse({description: 'Usuário logado com sucesso', type: TokenResponse})
	async login(@Body() body: LoginUser) {
		console.log(`[API GATEWAY]: Login User request ${body.username}`);
		return await this.authProxy.send<TokenResponse, LoginUser>('auth-login', body, { op: 'login' });
	}


	@Post('refresh')
	@ApiOperation({summary: 'Gera um novo token de acesso'})
	@ApiOkResponse({description: 'Novo token gerado com sucesso', type: TokenResponse})
	@ApiUnauthorizedResponse({description: 'Refresh token inválido'})
	async refresh(@Body() body: RefreshUser) {
		console.log(`[API GATEWAY]: Refresh Token request`);

		const options: ProxyOptions = {
			op: 'refresh',
			code: HttpStatus.UNAUTHORIZED,
		};

		return await this.authProxy.send<TokenResponse, string>('auth-refresh', body.refreshToken, options);
	}

	@Get('users')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({summary: 'Lista usuários cadastrados'})
	@ApiOkResponse({description: 'Lista de usuários', type: UserResponse, isArray: true})
	async users() {
		console.log('[API GATEWAY]: List Users');
		return await this.authProxy.send<UserResponse>('users-list');
	}
}
