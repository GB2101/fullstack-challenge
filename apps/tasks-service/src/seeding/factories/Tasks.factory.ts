import { faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Task } from "../../entities";

export const TaskFactory = setSeederFactory(Task, () => {
	const task = new Task();

	task.title = faker.company.buzzPhrase();
	task.description = faker.lorem.sentence();
	task.deadline = faker.date.soon({days: 7});

	return task;
});