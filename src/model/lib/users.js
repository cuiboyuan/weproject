export default class User {
	constructor(
		userId,
		userName,
		passward,
		ownedProjectIds,
		joinedProjectIds,
		description,
		connections,
		appliedProj,
		skills
	) {
		this.id = userId;
		this.userName = userName;

		this.passward = passward; /* change passward to SHA-256 */
		this.ownedProjectIds = ownedProjectIds || [];
		this.joinedProjectIds = joinedProjectIds || [];
		this.appliedProj = appliedProj || [];
		this.skills = skills || [];
		//added attributes:
		this.description = description;
		//their connections (friends), an array of uID
		this.connections = connections || [];
		//if it is topped by admin
		this.topped = false;

		// Hard-coded default values
		this.experiences = [
			{
				company: "University of Toronto",
				position: "Undergraduate",
				start: "2018-09-10",
				end: "2022-06-01",
			},
		];
		this.skills = ["JavaScript"];
		this.socialMedia = {
			email: `${userName}@${userName}.com`,
			linkedin: `linkedin.com/${userName}`,
			github: `github.com/${userName}`,
		};
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
			object.connections,
			object.topped
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
			connections: this.connections,
			topped: this.topped,
		};
	}
}
