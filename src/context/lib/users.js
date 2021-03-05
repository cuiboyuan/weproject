import React, { createContext, useContext, useState, useEffect } from "react";
import uuid from "react-uuid";

import { User } from "../../model";

const UsersContext = createContext();

const data = [...Array(12).keys()].map((_, i) =>
	User.fromResponseBody({
		id: uuid(),
		description: `user${i} discription`,
		userName: `user${i}`,
		password: `user${i}`,
		ownedProjectIds: [],
		joinedProjectIds: [],
		connection:[]
	})
);

export const UsersProvider = props => {
	const [users, setUsers] = useState(data);

	const getValues = () => {
		return {
			users,
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
