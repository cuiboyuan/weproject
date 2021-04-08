import React, { createContext, useContext, useState, useEffect } from "react";
import uuid from "react-uuid";
import {
	useLoadAllUsers,
	useRegister,
	upload_avatar,
	get_avatar,
} from "../../actions/user_profile";
import { useAuthState } from "../../context";
import { User } from "../../model";

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

// const data = [...Array(12).keys()].map((_, i) =>
//     User.fromResponseBody({
//         id: uuid(),
//         description: `user${i} description`,
//         userName: `user${i}`,
//         password: `user${i}`,
//         ownedProjectIds: [],
//         joinedProjectIds: [],
//         connection: [],
//     })
// );
// data = []
// data.push(
//     User.fromResponseBody({
//         id: uuid(),
//         description: "",
//         userName: "testName",
//         password: "abcd",
//         ownedProjectIds: [],
//         joinedProjectIds: [],
//         connection: [],
//     })
// );

// data.push(
//     User.fromResponseBody({
//         id: uuid(),
//         description: `user description`,
//         userName: `user`,
//         password: `user`,
//         ownedProjectIds: [],
//         joinedProjectIds: [],
//     })
// );

// data.push(
//     User.fromResponseBody({
//         id: uuid(),
//         description: `admin description`,
//         userName: `admin`,
//         password: `admin`,
//         ownedProjectIds: [],
//         joinedProjectIds: [],
//     })
// );

//TODO: implement the folowing in the order:
//1 server on success
//2 update the context
export const UsersProvider = props => {
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
				.then(res => {
					if (res.status === 200) {
                        refresh();
                        console.log(res);
						resolve(res);
					} else {
						reject(res);
					}
				})
				.catch(err => reject(err));
		});
		return promise;
	};

	//part for adding new user
	// const auth = useAuthState();
	// const [newUserName, setnewUserName] = useState("");
	// const [{ regSuccess, newUser }, setRegInputs] = useRegister();
	// useEffect(() => {
	// 	if (regSuccess) {
	// 		users.push(User.fromResponseBody({ userName: newUserName }));
	// 		auth.simpleCheck(newUserName);
	// 		setUpdate(!update);
	// 	}
	// }, [regSuccess]);
	// const addUser = (userName, password) => {
	// 	setRegInputs(userName, password);
	// 	setnewUserName(userName);
	// };

	// const updateUser = user => {
	// 	let newUsers = users;
	// 	let index = newUsers.findIndex(u => u._id === user._id);
	// 	if (index >= 0) {
	// 		newUsers.splice(index, 1, user);
	// 		setUsers(newUsers);
	// 	}
	// };

	// const removeProject = (userName, projectId) => {
	// 	let index = users.findIndex(u => u.userName === userName);
	// 	if (index >= 0) {
	// 		let owned = users[index].ownedProjectIds;
	// 		owned.filter(o => o === projectId);
	// 		users[index].ownedProjectIds = owned;
	// 		setUsers(users);
	// 	}
	// };

	// /** API call for UserProfile page */
	// const FRONTEND_ERR = 500;
	// const getUser = username => {
	// 	const user = users.filter(u => u.userName === username)[0];

	// 	if (user) {
	// 		return user;
	// 	} else {
	// 		return 404;
	// 	}
	// };

	// const updateUserProfile = async updateInfo => {
	// 	const login = auth.userName;
	// 	try {
	// 		const res = await updateProfile(updateInfo);

	// 		const user = getUser(login);
	// 		for (let attr of Object.keys(updateInfo)) {
	// 			if (user[attr]) {
	// 				user[attr] = updateInfo[attr];
	// 			}
	// 		}
	// 		updateUser(user);
	// 		return res.status;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return FRONTEND_ERR;
	// 	}
	// };

	// const deleteUserProfile = async username => {
	// 	try {
	// 		const res = await deleteProfile(username);
	// 		if (res.ok) {
	// 			const user = await res.json();
	// 			const updatedUsers = users.filter(u => u.userName !== user.userName);
	// 			setUsers(updatedUsers);
	// 			return 200;
	// 		}
	// 		return 500;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return FRONTEND_ERR;
	// 	}
	// };

	// /** Functionality for connecting with other users */
	// const addFriend = async friendName => {
	// 	try {
	// 		const res = await connectFriend(friendName);
	// 		if (res.status === 200) {
	// 			const user = getUser(friendName);
	// 			user.pending.push(friendName);
	// 			updateUser(user);
	// 		}
	// 		return res.status;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return FRONTEND_ERR;
	// 	}
	// };

	// const deleteFriend = async friendName => {
	// 	try {
	// 		const res = await removeFriend(friendName);
	// 		if (res.status === 200) {
	// 			const login = auth.userName;
	// 			const user = getUser(login);

	// 			const idx = user.connections.indexOf(friendName);
	// 			user.connections.splice(idx, 1);
	// 			updateUser(user);

	// 			const friend = getUser(friendName);
	// 			const idx2 = user.connections.indexOf(login);
	// 			friend.connections.splice(idx2, 1);
	// 			updateUser(friend);
	// 		}
	// 		return res.status;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return FRONTEND_ERR;
	// 	}
	// };

	// const replyRequests = async (friendName, accept) => {
	// 	try {
	// 		const res = await replyRequest(friendName, accept);
	// 		if (res.status === 200) {
	// 			const login = auth.userName;
	// 			const user = getUser(login);

	// 			const idx = user.connections.indexOf(friendName);
	// 			user.pending.splice(idx, 1);
	// 			if (accept) {
	// 				user.connections.push(friendName);
	// 			}
	// 			updateUser(user);

	// 			const friend = getUser(friendName);
	// 			if (accept) {
	// 				friend.connections.push(login);
	// 			}
	// 			updateUser(friend);
	// 		}
	// 		return res.status;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return FRONTEND_ERR;
	// 	}
	// };

	// const getValues = () => {
	// 	return {
	// 		users,
	// 		addUser,
	// 		setUsers,
	// 		removeProject,
	// 		updateUser,

	// 		getUser,
	// 		updateUserProfile,
	// 		deleteUserProfile,

	// 		addFriend,
	// 		deleteFriend,
	// 		replyRequests,
    //         refresh,
    //         uploadAvatar,
	// 	};
	// };

	// return (
	// 	<UsersContext.Provider value={getValues()}>
	// 		{props.children}
	// 	</UsersContext.Provider>
	// );
    const auth = useAuthState();
    const [newUserName, setnewUserName] = useState("");
    const [{ regSuccess, newUser }, setRegInputs] = useRegister();
    useEffect(() => {
        if (regSuccess) {
			users.push(User.fromResponseBody({userName:newUserName}))
            auth.simpleCheck(newUserName, newUser);
            setUpdate(!update);
        }
    }, [regSuccess]);
    const addUser = (userName, password) => {
        setRegInputs(userName, password);
        setnewUserName(userName);
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
    const getUser = username => {
        const user = users.filter(u => u.userName === username)[0];
        
        if (user){
            return user;
        } else {
            return 404;
        }
    }

    const updateUserProfile = async (updateInfo) => {
        const login = auth.userName;
        try {
            const res = await updateProfile(updateInfo);

            const user = getUser(login);
            for (let attr of Object.keys(updateInfo)){
                        
                if (user[attr]){
                    user[attr] = updateInfo[attr]
                }
            }
            updateUser(user);
            return res.status;
        } catch (error) {
            console.log(error)
            return FRONTEND_ERR;
        }
    }

    const deleteUserProfile = async (username) => {
        try {
            const res = await deleteProfile(username);
            if (res.ok){
                const updatedUsers = users.filter(u => u.userName !== username);
                setUsers(updatedUsers);
                return 200;
            }
            return 500;
        } catch (error) {
            console.log(error)
            return FRONTEND_ERR;
        }
    }

    const deleteUserByName = async (userName)=>{
        await deleteUserProfile(userName)
    }


    /** Functionality for connecting with other users */
    const addFriend = async (friendName) => {
        if (friendName === auth.userName){
            return 400;
        }
        const login = auth.userName;
        try {
            const res = await connectFriend(friendName);
            if (res.status === 200){
                const user = getUser(friendName);
                if (!user.pending.includes(login)){       
                    user.pending.push(auth.userName);
                    updateUser(user);
                }
            }
            return res.status;
        } catch (error) {
            console.log(error)
            return FRONTEND_ERR;
        }
    }
    
    const deleteFriend = async (friendName) => {
        try {
            const res = await removeFriend(friendName);
            if (res.status === 200){
                const login = auth.userName;
                const user = getUser(login);

                const idx = user.connections.indexOf(friendName)
                user.connections.splice(idx, 1);
                updateUser(user);
                
                const friend = getUser(friendName);
                const idx2 = user.connections.indexOf(login)
                friend.connections.splice(idx2, 1);
                updateUser(friend);
            }
            return res.status;
        } catch (error) {
            console.log(error)
            return FRONTEND_ERR;
        }
    }

    
    const replyRequests = async (friendName, accept) => {
        try {
            const res = await replyRequest(friendName, accept);
            if (res.status === 200){
                const login = auth.userName;
                const user = getUser(login);

                const idx = user.connections.indexOf(friendName)
                user.pending.splice(idx, 1);
                if (accept){
                    user.connections.push(friendName);
                }
                updateUser(user);
                
                const friend = getUser(friendName);
                if (accept){
                    friend.connections.push(login);
                }
                updateUser(friend);
            }
            return res.status;
        } catch (error) {
            console.log(error)
            return FRONTEND_ERR;
        }
    }






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
            deleteUserByName


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
