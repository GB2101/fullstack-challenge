import { ApiProperty, PickType } from "@nestjs/swagger";
import { TasksResponse } from "./Task";

class PartialTask extends PickType(TasksResponse, ['id', 'title', 'deadline', 'priority', 'status'] as const) {}

export class SearchTaskResponse {
	@ApiProperty({example: 10, description: 'A quantidade de itens retornado na busca'})
		length: number;
	
	@ApiProperty({example: 30, description: 'O total de itens existentes'})
		total: number;
	
	@ApiProperty({type: PartialTask, isArray: true})
		results: PartialTask[];
}
