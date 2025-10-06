import { ApiProperty } from "@nestjs/swagger";
import { IsString,  } from "class-validator";

export class CreateComment {
	@IsString()
	@ApiProperty({example: 'this is a comment'})
		comment: string;
}

export type CreateCommentReq = {
	comment: string;
	username: string;
	taskID: string;
}
