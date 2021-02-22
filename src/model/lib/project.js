export default class Project {
	constructor(id, ownerId) {
		this.id = id;
		this.ownerId = ownerId;
		this.userIds = [];
		this.status = "incomplete";
		
	}

	static fromResponseBody(object) {
		return new Project(object.id, object.ownerId);
	}

	toJson() {
		return { id: this.id, ownerId: this.ownerId };
	}
}
