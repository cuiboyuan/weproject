export default class User {
	constructor(userId, userName, passward, ownedProjectIds, joinedProjectIds) {
		this.id = userId;
		this.userName = userName;
		this.passward = passward; /* change passward to SHA-256 */
		this.ownedProjectIds = ownedProjectIds || [];
		this.joinedProjectIds = joinedProjectIds || [];
		
		// Hard-coded default values
		this.experiences = [
			{
				company: "University of Toronto",
				position: "Undergraduate",
				start: "2018-09-10",
				end: "2022-06-01",
			},
		];
		this.skills = [
			'JavaScript',
		];
		this.socialMedia = {
			email: `${userName}@${userName}.com`,
			linkedin: `linkedin.com/${userName}`,
			github: `github.com/${userName}`,
		};
		this.userBio = `I am ${userName}.`;

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
