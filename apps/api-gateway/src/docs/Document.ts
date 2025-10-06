import { DocumentBuilder } from "@nestjs/swagger";

export const Document = new DocumentBuilder()
	.setTitle('Sistema de Gestão de Tarefas')
	.setDescription('Projeto Fullstack desenvolvido por Gabriel Braz')
	.setVersion('1.0')
	.addBearerAuth()
	.build();
