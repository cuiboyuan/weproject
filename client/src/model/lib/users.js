export default class User {
	constructor(
		userId,
		userName,
		password,
		isAdmin,
		ownedProjectIds,
		joinedProjectIds,
		description,
		connections,
		appliedProj,
		experiences,
		skills,
		pending,
		topped,
		email,
		linkedin,
		github,
	) {
		this._id = userId;
		this.userName = userName;
		this.isAdmin = isAdmin || false;

		this.password = password; /* change passward to SHA-256 */
		this.ownedProjectIds = ownedProjectIds || [];
		this.joinedProjectIds = joinedProjectIds || [];
		this.appliedProj = appliedProj || [];
		this.skills = skills || [];
		//added attributes:
		this.description = description || "";
		//their connections (friends), an array of uID
		this.connections = connections || [];
		//if it is topped by admin
		this.topped = topped || false;
		//the applicants 
		this.pending = pending || []

		// Hard-coded default values
		this.experiences = experiences || [];
		this.skills = skills || [];
		
		this.email= email || '';
		this.linkedin= linkedin || '';
		this.github= github || '';

		// this.avatar = {name:''};
	}

	static fromResponseBody(object) {
		return new User(
			object._id,
			object.userName,
			object.password,
			object.isAdmin,
			object.ownedProjectIds,
			object.joinedProjectIds,
			// added attributes:
			object.description,
			object.connections,
			object.appliedProj,
			object.experiences,
			object.skills,
			object.pending,
			object.topped,
			object.email,
			object.linkedin,
			object.github,
		);
	}

	toJson() {
		return {
			_id: this._id,
			userName: this.userName,
			password: this.password,
			isAdmin: this.isAdmin,
			ownedProjectIds: this.ownedProjectIds,
			joinedProjectIds: this.joinedProjectIds,
			description: this.description,
			connections: this.connections,
			appliedProj: this.appliedProj,
			experiences: this.experiences,
			skills: this.skills,
			pending: this.pending,
			topped: this.topped,
			email: this.email,
			linkedin: this.linkedin,
			github: this.github,
			// avatar: this.avatar
		};
	}
}
