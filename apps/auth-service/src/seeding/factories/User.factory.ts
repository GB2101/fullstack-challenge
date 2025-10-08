import { faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { User } from "../../entities";

export const UserFactory = setSeederFactory(User, () => {
	const user = new User();

	user.username = faker.internet.username();
	user.password = user.username; // for testing purposes, password is the same as username
	user.email = faker.internet.email();

	return user;
});
