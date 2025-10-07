export type CreateData = {
	title: string;
	description: string;
	deadline: Date;
	users?: string[];
	priorityID: number;
	statusID: number;
}

export type CreateTasks = {
	username: string;
	task: CreateData;
}
