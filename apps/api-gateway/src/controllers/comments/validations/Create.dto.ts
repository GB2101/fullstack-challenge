import { IsString,  } from "class-validator";

export class CreateComment {
	@IsString()
		comment: string;
}

export type CreateCommentReq = {
	comment: string;
	username: string;
	taskID: string;
}
