import React, { createContext, useContext, useState, useEffect } from "react";
import uuid from "react-uuid";
import { useLoadAllUsers } from "../../actions/user_profile";

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

export const UsersProvider = (props) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const url = `${API_HOST}/api/users`;
        const makerequest = async () => {
            try {
                const res = await fetch(url);
                if (res.status === 200) {
                    const json = await res.json();
                    console.log("json", json);
                    setUsers(json);
                }
            } catch (err) {
                console.log(err);
            }
        };

        makerequest();
    }, []);

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
