import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";
import { Pagination } from "src/classes";

export class SearchTasks extends Pagination {
	@IsBoolean()
	@IsOptional()
	@ApiPropertyOptional({example: false, description: 'Se true, ignora paginação e retorna todas as tasks'})
		every?: boolean;
	
	@IsBoolean()
	@IsOptional()
	@ApiPropertyOptional({example: false, description: 'Se true, inclui tasks com deadline no passado'})
		past?: boolean;
	
	@IsDate()
	@IsOptional()
	@ApiPropertyOptional({example: '2023-01-01T00:00:00Z'})
		deadline?: Date;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({example: 'john_doe'})
		username?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({example: 'Task Title'})
		title?: string;
};
