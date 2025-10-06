export type JwtPayload = {
	sub: string;
}

export type Authorization = {
	user: JwtPayload
}
