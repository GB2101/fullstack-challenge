import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Document } from "./docs/Document";
import { SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			}
		}),
	);

	const documentFactory = () => SwaggerModule.createDocument(app, Document);
	SwaggerModule.setup('docs', app, documentFactory);

	const port = process.env.port ?? 3000;
	await app.listen(port);
	console.log(`API Gateway: RUNNING on Port ${port}...`);
}
bootstrap().catch(err => console.error(err));
