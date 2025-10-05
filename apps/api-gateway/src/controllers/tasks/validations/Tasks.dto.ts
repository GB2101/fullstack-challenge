import { IsDateString, IsNumber, IsString, Length } from "class-validator";
import { LENGTHS } from "src/utils/constants";

export class CreateTasks {
	@IsString()
	@Length(LENGTHS.Tasks.title)
		title: string;

	@IsString()
		description: string;

	@IsDateString()
		deadline: string;
	
	@IsNumber()
		priorityID: number;

	@IsNumber()
		statusID: number;
}