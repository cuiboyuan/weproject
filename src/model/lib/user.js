export default class User {
	constructor(userId, userName, passward) {
		this.id = userId;
		this.userName = userName;
		this.passward = passward; /* change passward to SHA-256 */
		this.ownedProjectIds = [];
		this.joinedProjectIds = [];
	}

	static fromResponseBody(object) {
		return new User(object.userName, object.passward);
	}

	toJson() {
		return { userName: this.userName, passward: this.passward };
	}
}
