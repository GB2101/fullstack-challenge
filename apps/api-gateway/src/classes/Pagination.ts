import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class Pagination {
	@IsNumber()
	@IsPositive()
	@IsOptional()
	@ApiProperty()
		page?: number;
	
	@IsNumber()
	@IsPositive()
	@IsOptional()
	@ApiProperty()
		size?: number;
}