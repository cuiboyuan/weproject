import React, { createContext, useContext, useState, useEffect } from "react";
import ENV from "../config.js";
const API_HOST = ENV.api_host;

// export const getProfile = async (app) => {
//     const url = `${API_HOST}/api/user`;

//     let { auth, allUsers, allProjects, location } = app.props;
//     console.log(app.props);
//     // Change to EXTERNAL CALL in phase 2:
//     const loginName = auth.userName;

//     let currentName,
//         currentUser,
//         loginUser,
//         isProfile,
//         ownedProjects,
//         joinedProjects;
//     try {
//         const res = await fetch(`${url}/${loginName}`);

//         if (res.status !== 200) {
//             return res.status;
//         }
//         const login = await res.json();

//         isProfile = false;
//         loginUser = login;

//         if (location.pathname === "/profile") {
//             currentName = loginName;
//             currentUser = loginUser;
//             isProfile = true;
//         } else {
//             // need some change
//             currentName = location.state.data.userName;

//             const response = await fetch(`${url}/${currentName}`);

//             if (response.status !== 200) {
//                 return response.status;
//             }
//             const user = await response.json();

//             currentUser = user;

//             console.log(currentUser);
//         }

//         // change afterwards
//         ownedProjects = allProjects.projects.filter(
//             (item) => item.owner.userName == currentName
//         );
//         joinedProjects = allProjects.projects.filter((item) =>
//             item.userIds.includes(currentUser._id)
//         );
//         app.setState({
//             userName: currentName,
//             loginName: loginName,

//             // avatar: currentUser.avatar,
//             description: currentUser.description,
//             email: currentUser.email,
//             linkedin: currentUser.linkedin,
//             github: currentUser.github,
//             skills: currentUser.skills,

//             experiences: currentUser.experiences,

//             ownedProjects: ownedProjects,
//             joinedProjects: joinedProjects,

//             isAdmin: loginUser.isAdmin,
//             isProfile: isProfile,
//         });
//         return 200;
//     } catch (error) {
//         return 500;
//     }
// };

// export const fetchUser = async (username) => {
//     const url = `${API_HOST}/api/user`;

//     try {
//         const res = await fetch(`${url}/${username}`);

//         if (res.status === 200) {
//             const user = await res.json();
//             return user;
//         }
//         return Promise.reject()

//     } catch (error) {
//         return Promise.reject();
//     }
// }

export const updateProfile = async (updateInfo) => {
    const url = `${API_HOST}/api/updateProfile`;
    let res;
    try {
        res = await fetch(`${url}`, {
            method: "PATCH",
            body: JSON.stringify(updateInfo),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        return res;
    } catch (error) {
        return res;
    }
};

export const deleteProfile = async (username) => {
    const url = `${API_HOST}/api/deleteUser`;
    // console.log("deleteProfile server request url", url, username)

    let res;
    try {
        res = await fetch(`${url}/${username}`, {
            method: "DELETE",
        });

        const result = await res.json();

        return result;
    } catch (error) {
        return res;
    }
};

export const connectFriend = async (username) => {
    const url = `${API_HOST}/connections/request`;

    let res;
    try {
        res = await fetch(`${url}/${username}`, {
            method: "POST",
        });

        return res;
    } catch (error) {
        return res;
    }
};

export const removeFriend = async (friendName) => {
    const url = `${API_HOST}/connections/remove`;

    let res;
    try {
        res = await fetch(`${url}/${friendName}`, {
            method: "DELETE",
        });

        return res;
    } catch (error) {
        return res;
    }
};

export const replyRequest = async (friendName, accept) => {
    const url = `${API_HOST}/connections/reply`;
    let res;
    try {
        res = await fetch(`${url}/${friendName}`, {
            method: "PATCH",
            body: JSON.stringify({ accept: accept }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res;
    } catch (error) {
        return res;
    }
};

export const requestLogin = async (userName, password) => {
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
        return res;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const requestAddUser = async (userName, password) => {
    const url = `${API_HOST}/api/newUser`;
    const request = new Request(url, {
        method: "post",
        //TODO: isAdmin might not be neccessary
        body: JSON.stringify({
            userName: userName,
            password: password,
            isAdmin: false,
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    try {
        const res = await fetch(request);
        if (res.status === 200) {
            // setUser(res.json);
            const json = await res.json();
            return json;
        }
    } catch (err) {
        console.log("hook call fail!!!, err is:", err);
    }
};



export const requestTopUser = async (userName) => {
    const url = `${API_HOST}/api/top/${userName}`;
    try {
        if (userName) {
            const res = await fetch(url);
            if (res.status === 200) {
                return res
            }
        }
    } catch (err) {
        console.log(err);
    }
};

export const requestLogout = async () => {
    const res = await fetch(`${API_HOST}/api/logout`);
    return res;
};

export const upload_avatar = (user, form) => {
    const formData = new FormData();
    formData.append("file", form);
    return fetch(`${API_HOST}/api/user/${user.userName}/images`, {
        method: "POST",
        body: formData,
    });
};

export const get_avatar = async (user) => {
    const res = await fetch(`${API_HOST}/api/user/${user.userName}/images`, {
        method: "GET",
    });
    return res.json();
};
