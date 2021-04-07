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

    let res;
    try {
        res = await fetch(`${url}/${username}`, {
            method: "DELETE",
        });

        const result = await res.json();

        return res;
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

/**
 * TODO2: not utlizing the client/src/model/lib/users.js functions, the backend API
 * and front end API should be updated to make sure the consistency of json attributes
 *
 * TODO3: error checking ?
 */

/**
 * Customized hook for checking if the user has logged in, used
 * in auth page,
 * @param {string} userName
 * @param {string} password
 * @returns
 * @loggedin {bool} whether the username, password is correct
 * @user {Object} the user info in the DB
 */
export const useIsLoggedIn = () => {
    //used in the effect hook, for update
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    //for update, used in the caller function
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const setInputs = function (userName, password) {
        setuserName(userName);
        setpassword(password);
    };

    useEffect(() => {
        const url = `${API_HOST}/api/login`;
        const request = new Request(url, {
            method: "post",
            body: JSON.stringify({ userName: userName, password: password }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        });

        const makeRequest = async () => {
            try {
                const res = await fetch(request);
                if (res.status === 200) {
                    // setUser(res.json);
                    setLoggedIn(true);
                    const json = await res.json();
                    setUser(json);
                    console.log("usehook", user);
                }
            } catch (err) {
                console.log("hook call fail!!!, err is:", err);
            }
        };
        //if the userName is not "", we make the request to the server
        if (userName) makeRequest();
    }, [userName, password]);
    return [{ loggedIn: loggedIn, user: user }, setInputs];
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
        return res
    } catch (err) {
        console.log(err)
        return false
    }
};

/**
 * user info register, used in loggin_page/index.js
 */
export const useRegister = () => {
    const [user, setUser] = useState(null);

    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [regSuccess, setregSuccess] = useState(false);
    // const [isAdmin, setisAdmin] = useState(initialState)
    const setInputs = function (userName, password) {
        setuserName(userName);
        setpassword(password);
    };

    useEffect(() => {
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
        const makeRequest = async () => {
            try {
                const res = await fetch(request);
                if (res.status === 200) {
                    // setUser(res.json);
                    const json = await res.json();
                    setUser(json);
                    setregSuccess(true);
                }
            } catch (err) {
                console.log("hook call fail!!!, err is:", err);
                setregSuccess(false);
            }
        };
        if (userName) makeRequest();
    }, [userName, password]);
    return [{ regSuccess: regSuccess, newUser: user }, setInputs];
};

export const useTopUser = () => {
    const [topUserName, settopUserName] = useState("");
    const [triggerTop, settriggerTop] = useState(false);
    const [res, setres] = useState(false);

    const triggerFunction = (userName) => {
        settopUserName(userName);
        settriggerTop(!triggerTop);
    };

    useEffect(() => {
        const makeRequest = async () => {
            const url = `${API_HOST}/api/top/${topUserName}`;
            try {
                if (topUserName) {
                    const res = await fetch(url);
                    if (res.status === 200) {
                        setres(true);
                    }
                }
            } catch (err) {
                setres(false);
                console.log(err);
            }
        };
        makeRequest();
    }, [triggerTop]);
    return [{ topUserName: topUserName, resTop: res }, triggerFunction];
};

export const requestLogout = async () => {
    const res = await fetch(`${API_HOST}/api/logout`);
    return res;
};

// export const useLoadAllUsers = ()=>{
//     //the array of all user objects
//     const [users, setusers] = useState([])

//     const [success, setsuccess] = useState(false)

//     useeffect(()=>{
//         const url = `${api_host}/api/users`
//         const makerequest = async ()=>{
//             try{
//                 const res = await fetch(url)
//                 if (res.status === 200){
//                     setusers(res.body)
//                     setsuccess(true)
//                 }
//             }catch(err){
//                 console.log(err)
//                 setsuccess(false)
//             }
//         }

//         makerequest()
//     }, [])

//     return {data:users, success: success}

// }
