type TaskRef = {
	id: string;
	title: string;
};

export type CommentPayload = {
	id: number;
	timestamp: Date;
	username: string;
	task: TaskRef;
	users: string[];
};
