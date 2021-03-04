import { User } from "../";

export default class Project {
	constructor(id, owner, name, description, members, status, userLiked, tags) {
		this.id = id;
		this.owner = User.fromResponseBody(owner);
		this.name = name;
		this.description = description;
		this.userIds = members || [];
		this.status = status || "incomplete";
		this.userLiked = userLiked || [];
		this.tags = tags || [];

		//added new attributes by Tian
			// indicate whether the current project is topped by admin
		this.topped = false;
	}

	static fromResponseBody(object) {
		return new Project(
			object.id,
			object.owner,
			object.name,
			object.description,
			object.userIds,
			object.status,
			object.userLiked,
			object.tags,

			//added new attributes by Tian
			object.topped
		);
	}

	toJson() {
		return {
			id: this.id,
			owner: this.owner,
			name: this.name,
			description: this.description,
			userIds: this.userIds,
			status: this.status,
			userLiked: this.userLiked,
			tags: this.tags,

			//added new attributes by Tian
			topped: this.topped
		};
	}
}
