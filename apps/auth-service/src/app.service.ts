import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'
import type { ConfigType } from '@nestjs/config';

import { User } from './entities/user.entity';
import { LoginUser, RegisterUser } from './validations';
import { JwtRefresh } from './config';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@Inject(JwtRefresh.KEY) private refreshConfig: ConfigType<typeof JwtRefresh>, 
		@InjectRepository(User) private userDB: Repository<User>,
	) {}

	async create(data:RegisterUser) {
		const username = await this.userDB.existsBy({ username: data.username });
		if (username) throw new RpcException('Este username já está cadastrado');
		
		const email = await this.userDB.existsBy({ email: data.email });
		if (email) throw new RpcException('Este email já está cadastrado');

		const user = this.userDB.create(data);
		return await this.userDB.save(user);
	}

	async login(data: LoginUser) {
		const user = await this.userDB.findOneBy({ username: data.username });
		if (!user) throw new RpcException('Username não encontrado');

		const isPasswordValid = await bcrypt.compare(data.password, user.password);
		if (!isPasswordValid) throw new RpcException('A senha está incorreta');

		const payload = { sub: data.username };
		const token = this.jwtService.sign(payload);
		const refreshToken = this.jwtService.sign(payload, this.refreshConfig);

		return { token, refreshToken };
	}

	async refresh(username: string) {
		const user = await this.userDB.findOneBy({ username });
		if (!user) throw new RpcException('Username não encontrado');

		const payload = { sub: username };
		return this.jwtService.sign(payload);
	}
}
