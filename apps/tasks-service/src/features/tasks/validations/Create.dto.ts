export type CreateTasks = {
	username: string;
	users?: string[];
	title: string;
	description: string;
	deadline: string;
	priorityID: number;
	statusID: number;
}
