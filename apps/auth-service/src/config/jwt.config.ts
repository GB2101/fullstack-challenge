import { registerAs } from "@nestjs/config";
import { JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt";


export const JwtConfig = registerAs('jwt-config', (): JwtModuleOptions => ({
	secret: process.env.jwt_key,
	signOptions: {
		expiresIn: process.env.jwt_expires,
	}
}))

export const JwtRefresh = registerAs('jwt-refresh', (): JwtSignOptions => ({
	secret: process.env.jwt_refresh_key,
	expiresIn: process.env.jwt_refresh_expires,
}));
