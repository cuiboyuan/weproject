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

    useEffect(() => {
        const checkSession = async () => {
            const res = await fetch(`${API_HOST}/api/check-session`);
            if (res.status === 200) {
                try {
                    const json = await res.json();

                    setIsLoggedIn(true);
                    setUserName(json.userName)
                    setIsAdmin(json.isAdmin);
                    console.log(`the session json isadmin ${json.isAdmin}`, json)
                } catch (err) {
                    console.log("fail", err);
                }
            }
        };
        checkSession();
    }, []);


    const login = async (logInUserName, password) => {
        const res = await requestLogin(logInUserName, password);
        if (res && res.status == 200) {
            const user = await res.json()
            setUserName(logInUserName);
            setIsAdmin(user.isAdmin);
            localStorage.setItem("username", userName);
            console.log("login success", userName)
            setIsLoggedIn(true);
        }else{
            notification["error"]({message:"wrong username/password"})
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
