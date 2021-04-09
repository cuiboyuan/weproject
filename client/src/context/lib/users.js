import React, { createContext, useContext, useState, useEffect } from "react";
import uuid from "react-uuid";
import {
    useLoadAllUsers,
    useRegister,
    upload_avatar,
    get_avatar,
    requestAddUser,
    requestTopUser,
} from "../../actions/user_profile";
import { useAuthState } from "../../context";

import { notification } from "antd";

import {
    updateProfile,
    deleteProfile,
    replyRequest,
    connectFriend,
    removeFriend,
} from "../../actions/user_profile";

import ENV from "../../config.js";
const API_HOST = ENV.api_host;

const UsersContext = createContext();

export const UsersProvider = (props) => {
    //part for initializing the data
    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        const url = `${API_HOST}/api/users`;
        const makerequest = async () => {
            try {
                const res = await fetch(url);
                if (res.status === 200) {
                    const json = await res.json();
                    var u_avatar = json;
                    json.forEach(async (u, i) => {
                        const avatar = await get_avatar(u);
                        if (avatar.length > 0) {
                            u_avatar[i].avatar = {
                                id: avatar[0].image_id,
                                name: avatar[0].image_name,
                                url: avatar[0].image_url,
                            };
                        }
                    });
                    setUsers(u_avatar);
                }
            } catch (err) {
                console.log(err);
            }
        };
        console.log(users);
        makerequest();
    };

    const uploadAvatar = (user, file) => {
        let promise = new Promise((resolve, reject) => {
            upload_avatar(user, file)
                .then((res) => {
                    if (res.status === 200) {
                        refresh();
                        console.log(res);
                        resolve(res);
                    } else {
                        reject(res);
                    }
                })
                .catch((err) => reject(err));
        });
        return promise;
    };

    const auth = useAuthState();
    const addUser = async (userName, password) => {
        const newUser = await requestAddUser(userName, password);
        if (newUser) {
            users.push(newUser);
            auth.login(userName, password);
        }
    };

    const topUser = async (userName, setifTopped, sortFunction) => {
        const res = await requestTopUser(userName);
        if (res) {
            const user = users.find((u) => u.userName === userName);
            user.topped = !user.topped;
            setifTopped(user.topped);
            console.log("current top value of", userName, user.topped);
            sortFunction();
        }
    };

    const updateUser = (user) => {
        let newUsers = users;
        let index = newUsers.findIndex((u) => u._id === user._id);
        if (index >= 0) {
            newUsers.splice(index, 1, user);
            setUsers(newUsers);
        }
    };

    const removeProject = (userName, projectId) => {
        let index = users.findIndex((u) => u.userName === userName);
        if (index >= 0) {
            let owned = users[index].ownedProjectIds;
            owned.filter((o) => o === projectId);
            users[index].ownedProjectIds = owned;
            setUsers(users);
        }
    };

    /** API call for UserProfile page */
    const FRONTEND_ERR = 500;
    const getUser = (username) => {
        const user = users.filter((u) => u.userName === username)[0];
        if (user) {
            return user;
        } else {
            return 404;
        }
    };

    const updateUserProfile = async (updateInfo) => {
        const login = auth.userName;
        try {
            const res = await updateProfile(updateInfo);

            const user = getUser(login);
            for (let attr of Object.keys(updateInfo)) {
                if (user[attr]) {
                    user[attr] = updateInfo[attr];
                }
            }
            updateUser(user);
            return res.status;
        } catch (error) {
            console.log(error);
            return FRONTEND_ERR;
        }
    };

    const deleteUserProfile = async (username) => {
        try {
            const res = await deleteProfile(username);
            if (res.ok) {
                for (let u of users) {
					console.log(u)
                    //connections
                    u.connections = u.connections.filter((u) => u != username);
                    // u.connections.remove(username);
                    //pending
                    u.pending = u.pending.filter((u) => u != username);
                    // u.pending.remove(username);
                }
                const updatedUsers = users.filter((u) => u.userName !== username);
				console.log(`deleteUserProfile updated users: ${updatedUsers}`)
                setUsers(updatedUsers);
                
				notification["success"]({
					message: `${username} Deleted`,
				});
                return 200;
            }
            return 500;
        } catch (error) {
            console.log(error);
			notification["error"]({
				message: `Fail to delete ${username} Something went wrong.`,
			});
            return FRONTEND_ERR;
        }
    };

    const deleteUserByName = async (userName) => {
        await deleteUserProfile(userName);
    };

    /** Functionality for connecting with other users */
    const addFriend = async (friendName) => {
        if (friendName === auth.userName) {
            return 400;
        }
        const login = auth.userName;
        try {
            const res = await connectFriend(friendName);
            if (res.status === 200) {
                const user = getUser(friendName);
                if (
                    !user.pending.includes(login) &&
                    !user.connections.includes(login)
                ) {
                    user.pending.push(auth.userName);
                    updateUser(user);
                }
                notification["success"]({
                    message: `Request send!`,
                });
            }
            return res.status;
        } catch (error) {
            console.log(error);
            notification["error"]({
                message: `Something went wrong`,
            });
            return FRONTEND_ERR;
        }
    };

    const deleteFriend = async (friendName) => {
        try {
            const res = await removeFriend(friendName);
            if (res.status === 200) {
                const login = auth.userName;
                const user = getUser(login);

                const idx = user.connections.indexOf(friendName);
                user.connections.splice(idx, 1);
                updateUser(user);

                const friend = getUser(friendName);
                const idx2 = user.connections.indexOf(login);
                friend.connections.splice(idx2, 1);
                updateUser(friend);
            }
            return res.status;
        } catch (error) {
            console.log(error);
            return FRONTEND_ERR;
        }
    };

    const replyRequests = async (friendName, accept) => {
        try {
            const res = await replyRequest(friendName, accept);
            if (res.status === 200) {
                const login = auth.userName;
                const user = getUser(login);

                const idx = user.connections.indexOf(friendName);
                user.pending.splice(idx, 1);
                if (accept) {
                    user.connections.push(friendName);
                }
                updateUser(user);

                const friend = getUser(friendName);
                if (accept) {
                    friend.connections.push(login);
                }
                updateUser(friend);
            }
            return res.status;
        } catch (error) {
            console.log(error);
            return FRONTEND_ERR;
        }
    };

    const getValues = () => {
        return {
            users,
            addUser,
            setUsers,
            removeProject,
            updateUser,

            getUser,
            updateUserProfile,
            deleteUserProfile,

            addFriend,
            deleteFriend,
            replyRequests,
            deleteUserByName,
            topUser,
            uploadAvatar,
        };
    };

    return (
        <UsersContext.Provider value={getValues()}>
            {props.children}
        </UsersContext.Provider>
    );
};

export function useUsersState() {
    const context = useContext(UsersContext);
    if (!context)
        throw new Error("useUsersState must be used within a UsersProvider");
    return context;
}
