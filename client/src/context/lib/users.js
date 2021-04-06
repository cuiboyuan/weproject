import React, { createContext, useContext, useState, useEffect } from "react";
import uuid from "react-uuid";
import { useLoadAllUsers, useRegister } from "../../actions/user_profile";
import { useAuthState } from "../../context";
import { User } from "../../model";

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
export const UsersProvider = (props) => {
	//part for initializing the data
    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const url = `${API_HOST}/api/users`;
        const makerequest = async () => {
            try {
                const res = await fetch(url);
                if (res.status === 200) {
                    const jsonFiles = await res.json();
                    console.log("The respond json file:", jsonFiles)
                    setUsers(jsonFiles);
                    console.log("users after setting", users)
                }
            } catch (err) {
                console.log(err);
            }
        };

        makerequest();
    }, []);


	//part for adding new user
    const auth = useAuthState();
    const [newUserName, setnewUserName] = useState("");
    const [{ regSuccess, newUser }, setRegInputs] = useRegister();
    useEffect(() => {
        if (regSuccess) {
			users.push(User.fromResponseBody({userName:newUserName}))
            auth.simpleCheck(newUserName);
            setUpdate(!update);
        }
    }, [regSuccess]);
    const addUser = (userName, password) => {
        setRegInputs(userName, password);
        setnewUserName(userName);
    };









    const updateUser = (user) => {
        let newUsers = users;
        let index = newUsers.findIndex((u) => u.id === user.id);
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

    const getValues = () => {
        return {
            users,
            addUser,
            setUsers,
            removeProject,
            updateUser,
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
