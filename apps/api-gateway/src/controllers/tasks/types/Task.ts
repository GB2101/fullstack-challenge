import { ApiProperty } from "@nestjs/swagger";

class Status {
	@ApiProperty({example: 1})
		id: number;
	@ApiProperty({example: 'TODO'})
		name: string;
}

class Priority {
	@ApiProperty({example: 4})
		id: number;
	@ApiProperty({example: 'URGENT'})
		name: string;
	@ApiProperty({example: 4})
		level: number;
}

export class TasksResponse {
	@ApiProperty()
		id: string;
	@ApiProperty({example: 'username'})
		createdBy: string;
	@ApiProperty({example: 'title'})
		title: string;
	@ApiProperty({example: 'description'})
		description: string;
	@ApiProperty()
		deadline: Date;
	@ApiProperty()
		creationDate: Date;
	@ApiProperty()
		status: Status;
	@ApiProperty()
		priority: Priority;
}
