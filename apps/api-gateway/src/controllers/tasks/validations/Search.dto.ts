import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class SearchTasks {
	@IsNumber()
	@IsPositive()
	@IsOptional()
		page?: number;
	
	@IsNumber()
	@IsPositive()
	@IsOptional()
		size?: number;
}