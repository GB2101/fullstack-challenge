import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNumber, IsOptional, IsPositive, IsString, Length, ArrayNotEmpty } from "class-validator";
import { LENGTHS } from "src/utils/Constants";

export class CreateTasks {
	@IsString()
	@Length(LENGTHS.Tasks.title)
	@ApiProperty({example: 'title'})
		title: string;

	@IsString()
	@ApiProperty({example: 'description'})
		description: string;

	@IsDateString()
	@ApiProperty({example: '2025-10-10T13:00:00'})
		deadline: string;

	@IsNumber()
	@IsPositive()
	@ApiProperty({example: 1})
		priorityID: number;

	@IsNumber()
	@IsPositive()
	@ApiProperty({example: 1})
		statusID: number;

	@IsArray()
	@IsOptional()
	@ArrayNotEmpty()
	@IsString({each: true})
	@ApiPropertyOptional({example: ["username"]})
		users?: string[];
}

export type CreateTasksReq = CreateTasks & {
	username: string;
}
