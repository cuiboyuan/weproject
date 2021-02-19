import React from 'react'
import { useParams } from 'react-router-dom';
import './App.css';
import { uid } from "react-uid";

import User from './model/lib/user'

class SkillList extends React.Component {
  render(){
    return (
      <div>
        <ul></ul>
      </div>
    )
  }
}

class ExperienceList extends React.Component {
  render(){
    return (
      <div>
        <ul></ul>
      </div>
    )
  }
}

class ProjectList extends React.Component {

    render(){
        // EXTERNAL CALL to server to get this user's projects
        const {projectIds, allProjects} = this.props;
        const userProject = allProjects.filter(
          (project) => {
            return (projectIds.includes(project.id));
          }
        );
        
        return (
            <ul>
              {userProject.map(
                (project) => {
                  return (
                    <li key={uid(project)}>
                      Project {project.id} <br></br>
                      Owner: {project.ownerId} <br></br>
                      Status: {project.status}
                    </li>
                  )
                }
              )}
            </ul>
        )
    }
}

class ProfilePhoto extends React.Component {
  render(){
    // EXTERNAL CALL to server to get this user's profile pic
    const pic = this.props.picture;
    return (
      <div>
        <img src={pic}></img>
      </div>
    )
  }
}

class UserProfile extends React.Component {
  

  render(){
    // EXTERNAL CALL to get this user's info
    const {allUsers, allProjects} = this.props.appState;
    let id = 0
    // id = useParams();
    let user = allUsers[id];

    let projectIds = (user.joinedProjectIds).concat(user.ownedProjectIds);

    return (
        <div>    
            <ProfilePhoto picture="logo.svg"></ProfilePhoto>
            <h1>{user.userName}</h1>
            <p> I am {user.userName}</p>
            <h4>Project Highlights</h4>
            <ProjectList projectIds={projectIds} allProjects={allProjects}></ProjectList>
            <h4>Skills</h4>
            <SkillList></SkillList>
            <h4>Experiences</h4>
            <ExperienceList></ExperienceList>
        </div>
    )
        
  }
}

export default UserProfile;
