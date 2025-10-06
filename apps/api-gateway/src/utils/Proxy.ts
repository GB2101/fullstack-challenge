import { firstValueFrom } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";
import { HttpException, HttpStatus } from "@nestjs/common";

export interface ProxyOptions {
	op: string;
	code?: number;
}

export class Proxy {
	constructor(private client: ClientProxy, private name: string) {}

	async send<Response, Input = unknown>(message: string, data?: Input, options?: ProxyOptions): Promise<Response> {
		try {
			const observable = this.client.send<Response>(message, data ?? {});
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error;
			const code = options?.code ?? HttpStatus.BAD_REQUEST;
			const prefix = `[${this.name.toUpperCase()} ${options?.op.toUpperCase() ?? 'REQUEST'}]`;

			console.error(`<-- ERROR --> ${prefix}`, error);
			throw new HttpException(error.message, code);
		}
	}
}