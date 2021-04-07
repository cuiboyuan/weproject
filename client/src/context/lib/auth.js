import React, { createContext, useContext, useState, useEffect } from "react";
import ENV from "../../config.js";
const API_HOST = ENV.api_host;
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

    useEffect(()=>{
        const checkSession = async ()=>{
            const res = await fetch(`${API_HOST}/api/check-session`)
            console.log("the res in auth.js", res)
            if (res.status === 200){
                try{
                console.log("in the respond body")
                // if the user is logged in
                const json = await res.json()
                setIsLoggedIn(true)
                simpleCheck(json.userName)
                // console.log("json is!!!!!!!!!!!!!", json)
                }catch(err){
                    console.log("fail", err)

                }
                // simpleCheck(json.userName)
            }
        }
        checkSession()
    }, [])

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
