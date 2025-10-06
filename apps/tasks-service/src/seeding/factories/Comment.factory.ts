import { faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Comment } from "../../entities";

export const CommentFactory = setSeederFactory(Comment, () => {
	const comment = new Comment();

	comment.comment = faker.lorem.sentence();

	return comment;
});