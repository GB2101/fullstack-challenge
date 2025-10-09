import { ApiProperty } from "@nestjs/swagger";

class TaskRef {
	@ApiProperty({example: 'taskId'})
		id: string;

	@ApiProperty({example: 'Task Title'})
		title: string;
};

export class CreateCommentResponse {
	@ApiProperty({example: 1})
		id: number;

	@ApiProperty()
		timestamp: Date;

	@ApiProperty({example: 'username'})
		username: string;

	@ApiProperty({type: TaskRef})
		task: TaskRef;
		
	@ApiProperty({type: [String], example: ['user1', 'user2']})
		users: string[];
}
