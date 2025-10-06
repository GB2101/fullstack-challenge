class Status {
	id: number;
	name: string;
}

class Priority {
	id: number;
	name: string;
	level: number;
}

export class UpdateResponse {
	id: string;
	createdBy: string;
	title: string;
	description: string;
	deadline: Date;
	creationDate: Date;
	status: Status;
	priority: Priority;
}
