import { json } from "express";
import ENV from "../config.js";
const API_HOST = ENV.api_host;

export const getProfile = async (app) => {
    const url = `${API_HOST}/api/user`;

    let { auth, allUsers, allProjects, location } = app.props;
    console.log(app.props);
    // Change to EXTERNAL CALL in phase 2:
    const loginName = auth.userName;

    let currentName,
        currentUser,
        loginUser,
        isProfile,
        ownedProjects,
        joinedProjects;
    try {
        const res = await fetch(`${url}/${loginName}`);

        if (res.status !== 200) {
            return res.status;
        }
        const login = await res.json();

        isProfile = false;
        loginUser = login;

        if (location.pathname === "/profile") {
            currentName = loginName;
            currentUser = loginUser;
            isProfile = true;
        } else {
            // need some change
            currentName = location.state.data.userName;

            const response = await fetch(`${url}/${currentName}`);

            if (response.status !== 200) {
                return response.status;
            }
            const user = await response.json();

            currentUser = user;

            console.log(currentUser);
        }

        // change afterwards
        ownedProjects = allProjects.projects.filter(
            (item) => item.owner.userName == currentName
        );
        joinedProjects = allProjects.projects.filter((item) =>
            item.userIds.includes(currentUser._id)
        );
        app.setState({
            userName: currentName,
            loginName: loginName,

            // avatar: currentUser.avatar,
            description: currentUser.description,
            email: currentUser.email,
            linkedin: currentUser.linkedin,
            github: currentUser.github,
            skills: currentUser.skills,

            experiences: currentUser.experiences,

            ownedProjects: ownedProjects,
            joinedProjects: joinedProjects,

            isAdmin: loginUser.isAdmin,
            isProfile: isProfile,
        });
        return 200;
    } catch (error) {
        return 500;
    }
};

export const updateProfile = async (app) => {
    const url = `${API_HOST}/api/updateProfile`;

    let { auth, allUsers, allProjects, location } = app.props;

    // Change to EXTERNAL CALL in phase 2:
    const loginName = auth.userName;

    try {
        const res = await fetch(`${url}/${loginName}`, {
            method: "PATCH",
            body: JSON.stringify(app.state),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status !== 200) {
            return res.status;
        }

        console.log(await res.json());

        return 200;
    } catch (error) {
        return 500;
    }
};

export const deleteProfile = async (app) => {
    const url = `${API_HOST}/api/deleteUser`;

    // TODO: change this to check session afterwards
    const isAdmin = app.state.isAdmin;
    if (!isAdmin) {
        return 403;
    }

    const username = app.state.userName;

    try {
        const res = await fetch(`${url}/${username}`, {
            method: "DELETE",
        });

        if (res.status !== 200) {
            return res.status;
        }

        console.log(await res.json());

        return 200;
    } catch (error) {
        return 500;
    }
};

/**
 * send post request for user login, used in client/src/context/lib/auth.js
 * The idea is: async call defined here, used inside the useEffect hook, and
 * update the context. :)
 * @param {string} username
 * @param {string} pwd
 */

export const simpleCheck = async (userName, password) => {
    console.log("simpleCheckFunction");
    const url = `${API_HOST}/api/login`;
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({ userName: userName, password: password }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    try {
        const res = await fetch(request);
        console.log(res.json);
        if (res.status === 200){
            return res.json
        }
    } catch (error) {
        console.log(error)
    }
};
