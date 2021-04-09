import { User } from "../";

export default class Project {
	constructor(id, owner, name, description, requirement, members, status, usersLiked, tags, progress) {
		this.id = id;
		this.owner = User.fromResponseBody(owner);
		this.name = name;
		this.description = description;
		this.requirement = requirement;
		this.userIds = members || [];
		this.status = status || "incomplete";
		this.usersLiked = usersLiked || [];
		this.tags = tags || [];
		this.progress = progress || []
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
			object.usersLiked,
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
			usersLiked: this.usersLiked,
			tags: this.tags,

			//added new attributes by Tian
			topped: this.topped
		};
	}
}
