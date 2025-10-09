type Status = {
	id: number;
	name: string;
}

type Priority = {
	id: number;
	name: string;
	level: number;
}

export type TaskPayload = {
	id: string;
	createdBy: string;
	editedBy: string;
	title: string;
	description: string;
	deadline: Date;
	creationDate: Date;
	status: Status;
	priority: Priority;
	users?: string[];
}
