import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUser, RegisterUser } from './validations';

import { JwtPayload } from 'src/types';
import { SERVICES } from 'src/utils/Constants';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RefreshAuthGuard } from 'src/guards/refresh-auth.guard';
import { LoginResponse, RegisterResponse, RefreshResponse } from './types';
import { Proxy, ProxyOptions } from 'src/utils';
import { UserResponse } from './types/User';

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
	@ApiOkResponse({description: 'Usuário logado com sucesso', type: LoginResponse})
	@ApiUnauthorizedResponse({description: 'Usuário não autorizado.'})
	async login(@Body() body: LoginUser) {
		console.log(`[API GATEWAY]: Login User request ${body.username}`);

		const options: ProxyOptions = {
			op: 'login',
			code: HttpStatus.UNAUTHORIZED,
		};

		return await this.authProxy.send<LoginResponse, LoginUser>('auth-login', body, options);
	}


	@Post('refresh')
	@UseGuards(RefreshAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({summary: 'Gera um novo token de acesso'})
	@ApiOkResponse({description: 'Novo token gerado com sucesso', type: RefreshResponse})
	@ApiUnauthorizedResponse({description: 'Usuário não autorizado.'})
	async refresh(@Request() req: { user: JwtPayload }) {
		console.log(`[API GATEWAY]: Refresh Token request ${req.user.sub}`);

		const options: ProxyOptions = {
			op: 'refresh',
			code: HttpStatus.UNAUTHORIZED,
		}
		
		return await this.authProxy.send<RefreshResponse, string>('auth-refresh', req.user.sub, options);
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
