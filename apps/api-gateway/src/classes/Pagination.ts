import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class Pagination {
	@IsNumber()
	@IsPositive()
	@IsOptional()
	@ApiPropertyOptional({example: 1, default: 1})
		page?: number;
	
	@IsNumber()
	@IsPositive()
	@IsOptional()
	@ApiPropertyOptional({example: 10, default: 10})
		size?: number;
}