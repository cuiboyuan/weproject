import React, { createContext, useContext, useState, useEffect } from "react";
import ENV from "../../config.js";
import { notification } from "antd";
import { requestLogin, requestLogout } from "../../actions/user_profile.js";
const API_HOST = ENV.api_host;
const AuthContext = createContext();
const ADMIN = "admin";
const USER = "user";

export const AuthProvider = (props) => {
    const [userName, setUserName] = useState("");
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

    //used to refresh page to continue the session
    useEffect(() => {
        const checkSession = async () => {
            const res = await fetch(`${API_HOST}/api/check-session`);
            if (res.status === 200) {
                try {
                    // console.log("in the respond body");
                    // if the user is logged in
                    const json = await res.json();

                    setIsLoggedIn(true);
                    setUserName(json.userName)
                    setIsAdmin(json.isAdmin);
                    console.log(`the session json isadmin ${json.isAdmin}`, json)
                    // console.log("the login json!!!!!!!!!!!!!!!!!", json)
                    // simpleCheck(json.userName);
                    // console.log("json is!!!!!!!!!!!!!", json)
                } catch (err) {
                    console.log("fail", err);
                }
                // simpleCheck(json.userName)
            }
        };
        checkSession();
    }, []);

    // const simpleCheck = (username, user) => {
    //     if (username === ADMIN) setIsAdmin(true);
    //     setIsLoggedIn(true);
    //     setUserName(username);
    //     setIsAdmin(user.isAdmin);
    //     localStorage.setItem("username", username);
    // };

    const login = async (logInUserName, password) => {
        const res = await requestLogin(logInUserName, password);
        if (res && res.status == 200) {
            const user = await res.json()
            setUserName(logInUserName);
            setIsAdmin(user.isAdmin);
            localStorage.setItem("username", userName);
            console.log("login success", userName)
            setIsLoggedIn(true);
        }
    };

    const logout = async () => {
        const res = await requestLogout();
        if (res.status === 200) {
            localStorage.removeItem("username");
            setIsLoggedIn(false);
            setIsAdmin(false);
            notification["success"]({
                message: "Logout Successful!",
            });
        } else {
            notification["error"]({
                message: `Logout Failed`,
            });
        }
    };

    const getValues = () => {
        return {
            userName,
            isLoggedIn,
            isAdmin,
            // simpleCheck,
            logout,
            login,
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
