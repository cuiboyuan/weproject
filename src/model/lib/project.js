import { User } from "../";

export default class Project {
	constructor(id, owner, name, description, requirement, members, status, userLiked, tags, progress) {
		this.id = id;
		this.owner = User.fromResponseBody(owner);
		this.name = name;
		this.description = description;
		this.requirement = requirement;
		this.userIds = members || [];
		this.status = status || "incomplete";
		this.userLiked = userLiked || [];
		this.tags = tags || [];
		this.progress = progress || {}
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
		};
	}
}
