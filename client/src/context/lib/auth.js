import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const ADMIN = "admin";
const USER = "user";

export const AuthProvider = (props) => {
    const [userName, setUserName] = useState("user");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
	
	//moved to login_page/index.js, since the async call there
    // useEffect(() => {
    //     simpleCheck(
    //         localStorage.getItem("username"),
    //         localStorage.getItem("password")
    //     );
    // });

    // const simpleCheck = (username, pwd) => {
    // 	if (
    // 		(username === USER && pwd === USER) ||
    // 		(username === ADMIN && pwd === ADMIN)
    // 	) {
    // 		if (username === ADMIN) setIsAdmin(true);
    // 		setIsLoggedIn(true);
    // 		setUserName(username);
    // 		localStorage.setItem("username", username);
    // 		localStorage.setItem(
    // 			"password",
    // 			pwd
    // 		); /* change to backend api in phase 2 */
    // 		console.log("login sucessful: ", username, pwd);
    // 	}
    // 	return false;
    // };

    const simpleCheck = (username) => {
        if (username === ADMIN) setIsAdmin(true);
        setIsLoggedIn(true);
        setUserName(username);
		localStorage.setItem("username", username)
    };

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        setIsLoggedIn(false);
        setIsAdmin(false);
        window.location.reload(false);
    };

    const getValues = () => {
        return {
            userName,
            isLoggedIn,
            isAdmin,
            simpleCheck,
            logout,
        };
    };

    return (
        <AuthContext.Provider value={getValues()}>
            {props.children}
        </AuthContext.Provider>
    );
};

export function useAuthState() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuthState must be used within a AuthProvider");
    return context;
}
