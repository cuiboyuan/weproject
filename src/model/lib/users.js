export default class User {
	constructor(userId, userName, passward, ownedProjectIds, joinedProjectIds, description, connections) {
		this.id = userId;
		this.userName = userName;

		this.passward = passward; /* change passward to SHA-256 */
		this.ownedProjectIds = ownedProjectIds || [];
		this.joinedProjectIds = joinedProjectIds || [];



		//added attributes:
		this.description = description;
			//their connections (friends), an array of uID
		this.connections = connections || [];
	}

	static fromResponseBody(object) {
		return new User(
			object.id,
			object.userName,
			object.passward,
			object.ownedProjectIds,
			object.joinedProjectIds,
			// added attributes:
			object.description,
			object.connections

		);
	}

	toJson() {
		return {
			id: this.id,
			userName: this.userName,
			passward: this.passward,
			ownedProjectIds: this.ownedProjectIds,
			joinedProjectIds: this.joinedProjectIds,
			//added attributes:
			description: this.description,
			connections: this.connections
		};
	}
}
