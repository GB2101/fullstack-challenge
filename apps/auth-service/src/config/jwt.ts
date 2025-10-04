import { JwtModuleOptions } from "@nestjs/jwt";

export const JWT = (): JwtModuleOptions => ({
	secret: process.env.jwt_key,
	signOptions: {
		expiresIn: process.env.jwt_expires,
	}
})