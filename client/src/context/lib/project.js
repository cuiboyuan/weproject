import React, { createContext, useContext, useState, useEffect } from "react";
import uuid from "react-uuid";

import { Project } from "../../model";
import {
    fetch_project,
    create_project,
    delete_project,
    update_project,
    update_project_image,
    get_project_images,
    requestTopProject,
    requestThumUp,
} from "../../actions/project";
import { notification } from "antd";

const ProjectContext = createContext();

// const data = [...Array(9).keys()].map((_, i) => {
// 	const id = uuid();
// 	return new Project(
// 		id,
// 		{
// 			id: uuid(),
// 			userName: `user${i}`,
// 			password: `user${i}`,
// 			ownedProjectIds: [id],
// 			joinedProjectIds: [],
// 		},
// 		`project ${i}`,
// 		`project ${i} description`,
// 		`project requirement ${i}`,
// 		undefined,
// 		undefined,
// 		[],
// 		["tag 1", "tag 2"]
// 	);
// });

export const ProjectProvider = (props) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        fetch_project()
            .then((data) => {
                var d_w_img = data;
                data.forEach(async (proj, i) => {
                    console.log("REFRESH", proj);
                    const images = await get_project_images(proj);
                    d_w_img[i].images = images.map((img) => {
                        return {
                            id: img.image_id,
                            name: img.image_name,
                            url: img.image_url,
                        };
                    });
                });
                setProjects(data);
                console.log(data);
            })
            .catch((err) => console.error(err));
    };

    const addProject = (project) => {
        create_project(project)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        project._id = data.id;
                        setProjects([...projects, project]);
                    });
                } else {
                    return;
                }
            })
            .catch((err) => console.error(err));
    };

    const uploadProjectImage = (project, form) => {
        let promise = new Promise((resolve, reject) => {
            update_project_image(project, form)
                .then((res) => {
                    if (res.status === 200) {
                        refresh();
                        resolve(res);
                    } else {
                        reject(res);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
        });
        return promise;
    };

    const updateProject = (project) => {
        let index = projects.findIndex((p) => p.id === project.id);
        if (index >= 0) {
            update_project(project)
                .then((res) => {
                    if (res.status === 200) {
                        refresh();
                        return 200;
                    }
                })
                .catch((err) => {
                    console.error(err);
                    return 400;
                });
        }
    };

    const joinProject = (projectId, userName) => {
        let index = projects.findIndex((p) => p.id === projectId);
        if (index >= 0) {
            let exist = (projects[index].applicants || []).findIndex(
                (a) => a === userName
            );
            if (exist >= 0) return;
            projects[index].applicants = [
                ...(projects[index].applicants || []),
                userName,
            ];
            updateProject(projects[index]);
        }
    };

    const deleteProject = (projectId) => {
        let index = projects.findIndex((p) => p.id === projectId);
        console.log(index);
        if (index >= 0) {
            delete_project(projectId)
                .then((result) => {
                    if (result.status === 200) {
                        refresh();
                    } else {
                        console.error(result);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const proceedStep = (projectId) => {
        let index = projects.findIndex((p) => p.id === projectId);
        if (index >= 0) {
            let newProject = projects[index];
            if (newProject.progress.current < newProject.progress.steps) {
                newProject.progress.current = newProject.progress.current + 1;
            } else {
                newProject.progress.current = newProject.progress.steps.length;
            }
            updateProject(newProject);
            // projects.splice(index, 1, newProject);
            // setProjects(projects);
        }
    };

    const withdralStep = (projectId) => {
        let index = projects.findIndex((p) => p.id === projectId);
        if (index >= 0) {
            let newProject = projects[index];
            if (newProject.progress.current > 0) {
                newProject.progress.current = newProject.progress.current - 1;
            } else {
                newProject.progress.current = 0;
            }
            updateProject(newProject);
            // projects.splice(index, 1, newProject);
            // setProjects(projects);
        }
    };

    const topProject = async (projectID, setifTopped) => {
		console.log(`inside topProject ${projectID}` )
        let index = projects.findIndex((p) => p._id === projectID);
        if (index >= 0) {
            let project = projects[index];
			console.log(`the getted project is ${project}, index is ${index}`)
            const res = requestTopProject(projectID);
            if (res) {
                project.topped = !project.topped;
				setifTopped(project.topped)
            }
        }
    };

    const thumUpProject = async (project_ID, userName, setuserLikedNum)=>{
        let index = projects.findIndex((p) => p.id === project_ID);
        if (index >=0){
            let project = projects[index]
            if (project.usersLiked.includes(userName)){
                notification["warning"]({message:"you can not like the project twice"})
                console.log("liked twice!")
                return
            }
            const res = await requestThumUp(project_ID, userName)
            if (res){
                project.usersLiked.push(userName)
                setuserLikedNum(project.usersLiked.length)
            }
        }
    }


    const getValues = () => {
        return {
            projects,
            setProjects,
            updateProject,
            joinProject,
            deleteProject,
            proceedStep,
            withdralStep,
            addProject,
            refresh,
            uploadProjectImage,
            topProject,
            thumUpProject
        };
    };

    return (
        <ProjectContext.Provider value={getValues()}>
            {props.children}
        </ProjectContext.Provider>
    );
};

export function useProjectState() {
    const context = useContext(ProjectContext);
    if (!context)
        throw new Error(
            "useProjectState must be used within a ProjectProvider"
        );
    return context;
}
