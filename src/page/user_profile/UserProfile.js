import React from "react";
import "./style.css";
import { uid } from "react-uid";
// import defaultPic from "../../assets/defaultPic.svg"
import defaultPic from "../../logo.svg";

class SkillList extends React.Component {
	render() {
		return (
			<div>
				<ul></ul>
			</div>
		);
	}
}

class ExperienceList extends React.Component {
	render() {
		return (
			<div>
				<ul></ul>
			</div>
		);
	}
}

class ProjectList extends React.Component {
	render() {
		// EXTERNAL CALL to server to get this user's projects
		// const {projectIds, allProjects} = this.props;
		// const userProject = allProjects.filter(
		//   (project) => {
		//     return (projectIds.includes(project.id));
		//   }
		// );

		return (
			<ul>
				{/* {userProject.map(
                (project) => {
                  return (
                    <li key={uid(project)}>
                      Project {project.id} <br></br>
                      Owner: {project.ownerId} <br></br>
                      Status: {project.status}
                    </li>
                  )
                }
              )} */}
			</ul>
		);
	}
}

class ProfilePhoto extends React.Component {
	render() {
		// EXTERNAL CALL to server to get this user's profile pic
		let pic = this.props.picture;
		if (!pic) {
			pic = defaultPic; //"../../assets/defaultPic.jpg";
		}
		return (
			<div className="avatarContainer">
				<img className="avatar" src={pic} alt="avatar"></img>
			</div>
		);
	}
}

class UserProfile extends React.Component {
	render() {
		// EXTERNAL CALL to get this user's info
		const { auth } = this.props;

		console.log(auth);

		// let id = 0
		// // id = useParams();

		// let projectIds = (user.joinedProjectIds).concat(user.ownedProjectIds);

    return (
        <div>    
            <div id='userIntroSection'>
              <ProfilePhoto></ProfilePhoto>
              <div id="userNameBioSection">
                <h1 id='name'>{auth.userName}</h1>
                <p id='bio'> I am {auth.userName}</p>
              </div>
              <button id="editProfile">Edit Profile</button>
            </div>

				<h4>Project Highlights</h4>
				<ProjectList></ProjectList>

				<h4>Skills</h4>
				<SkillList></SkillList>

				<h4>Experiences</h4>
				<ExperienceList></ExperienceList>
			</div>
		);
	}
}

export default UserProfile;
