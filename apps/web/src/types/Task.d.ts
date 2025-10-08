export interface Task {
	id: string;
	title: string;
	description?: string;
	createdBy: string;
	editedBy: string;
	deadline: string; // ISO date string
	creationDate: string; // ISO date string
	users: null | string[];
	status: {
		id: number,
		name: string,
	},
	priority: {
		id: number,
		name: string,
		level: number,
	},
}

export interface TaskPrompt {
	id: string;
	title: string;
	deadline: string; // ISO date string
	users?: string[];
	status: {
		id: string;
		name: string;
	};
	priority: {
		id: string;
		name: string;
		level: number;
	}
}
