// export interface Task {
// 	id: string;
// 	title: string;
// 	description?: string;
// 	status: 'To Do' | 'In Progress' | 'Done';
// 	priority: 'Low' | 'Medium' | 'High';
// 	dueDate?: string; // ISO date string
// 	createdAt: string; // ISO date string
// 	updatedAt: string; // ISO date string
// }
export interface TaskPrompt {
	id: string;
	title: string;
	deadline: string; // ISO date string
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
