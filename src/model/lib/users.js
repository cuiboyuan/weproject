export default class User {
	constructor(userId, userName, passward, ownedProjectIds, joinedProjectIds) {
		this.id = userId;
		this.userName = userName;
		this.passward = passward; /* change passward to SHA-256 */
		this.ownedProjectIds = ownedProjectIds || [];
		this.joinedProjectIds = joinedProjectIds || [];
	}

	static fromResponseBody(object) {
		return new User(
			object.id,
			object.userName,
			object.passward,
			object.ownedProjectIds,
			object.joinedProjectIds
		);
	}

	toJson() {
		return {
			id: this.id,
			userName: this.userName,
			passward: this.passward,
			ownedProjectIds: this.ownedProjectIds,
			joinedProjectIds: this.joinedProjectIds,
		};
	}
}
