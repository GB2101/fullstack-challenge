import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsPositive, IsString, Length } from "class-validator";
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
}
