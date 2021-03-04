import React, { createContext, useContext, useState, useEffect } from "react";
import uuid from "react-uuid";

import { User } from "../../model";

const UsersContext = createContext();

const data = [...Array(12).keys()].map((_, i) =>
	User.fromResponseBody({
		id: uuid(),
		userName: `user${i}`,
		password: `user${i}`,
		ownedProjectIds: [],
		joinedProjectIds: [],
	})
);

data.push(User.fromResponseBody({
	id: uuid(),
	userName: `user`,
	password: `user`,
	ownedProjectIds: [],
	joinedProjectIds: [],
}))

data.push(User.fromResponseBody({
	id: uuid(),
	userName: `admin`,
	password: `admin`,
	ownedProjectIds: [],
	joinedProjectIds: [],
}))

export const UsersProvider = props => {
	const [users, setUsers] = useState(data);

	const updateUsers = (newUsers) => {setUsers(newUsers)}

	const getValues = () => {
		return {
			users,
			updateUsers
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
