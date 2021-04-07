import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Popover, Avatar, AutoComplete } from "antd";
import { AiOutlineUser } from "react-icons/ai";

import "./style.css";
import { useAuthState, useUsersState } from "../../context";

const Popup = (props) => {
    return (
        <div className="auth-popup">
            <Link to={{ pathname: "/profile" }}>
                <p>My profile</p>
            </Link>
            <Link to={{ pathname: "/newProject" }}>
                <p>Create project</p>
            </Link>
            <p className="auth-loggout" onClick={props.onClick}>
                Log out
            </p>
        </div>
    );
};

const Auth = (props) => {
    //TODO fix the error, how to trigger the error:
    //1 npm run build-run
    //2 login
    //3 refresh the page

    const usersContext = useUsersState();
    const authContext = useAuthState();

    const [loginUserName, setloginUserName] = useState(authContext.userName);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [user, setuser] = useState(null);

    useEffect(() => {
        setloginUserName(authContext.userName);
        setisLoggedIn(authContext.isLoggedIn);
        const index = usersContext.users.findIndex(
            (u) => u.userName === props.authInfo.userName
        );
        setuser(index >= 0 ? usersContext.users[index] : undefined);
		console.log("1111111111bracket values", usersContext.users, authContext.userName, authContext.isLoggedIn)
    }, [authContext.userName, authContext.isLoggedIn]);
    return (
        <div className="auth-container">
            {isLoggedIn ? (
                <div className="auth-avatar-container">
                    <Popover
                        content={() => <Popup onClick={props.logout} />}
                        placement="bottomRight"
                        title=""
                    >
                        {user?.avatar?.url ? (
                            <Avatar
                                icon={<AiOutlineUser />}
                                src={user.avatar.url}
                            />
                        ) : (
                            <Avatar icon={<AiOutlineUser />} />
                        )}
                        <span>{loginUserName}</span>
                    </Popover>
                </div>
            ) : (
                <div className="auth-sign-in">
                    <span>
                        <Link
                            to={{
                                pathname: "/loggin",
                                state: { type: "SIGNIN" },
                            }}
                        >
                            Sign In
                        </Link>
                    </span>

                    <Link
                        to={{ pathname: "/loggin", state: { type: "CREATE" } }}
                    >
                        <div className="rounded">Get Started</div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Auth;
