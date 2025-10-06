import { ApiProperty } from "@nestjs/swagger";

import { Status, Priority } from "src/classes";

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
