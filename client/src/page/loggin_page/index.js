import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { GoArrowSmallLeft } from "react-icons/go";

import "./style.css";
import Office from "../../assets/office.svg";
import { useAuthState, useUsersState } from "../../context";
import { useIsLoggedIn, useRegister } from "../../actions/user_profile";
// CREDIT: https://www.iconfont.cn/illustrations/detail?spm=a313x.7781069.1998910419.d9df05512&cid=24182


const InputField = (props) => {
    return (
        <div className="loggin-input-field">
            <span>{props.title}</span>
            <div className="loggin-input-container rounded">
                <input
                    className={`loggin-input-inner ${
                        props.hideText ? "loggin-password" : ""
                    }`}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    maxLength={20}
                />
            </div>
        </div>
    );
};
const Loggin = (props) => {
    const auth = useAuthState();
    const [type, setType] = useState(props.location?.state?.type || "SIGNIN");
    const toggleType = () => setType(type === "CREATE" ? "SIGNIN" : "CREATE");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
	const usersContext = useUsersState()

//===============log in logic ===================
    const [{ loggedIn, user }, setLoginInputs] = useIsLoggedIn();


	//when loggedIn, (returned by the async function), we 
	//call the simpleCheck function, which writes the username
	//to the context
    useEffect(() => {
        if (loggedIn) {
            auth.simpleCheck(username);
        }
    }, [loggedIn]);

	//on submitting the form, we use the "useIsLoggedIn" hook in
	//user_profile.js to update check if the user is logged in, 
	//setInputs is the trigger function for that hook
    const onSubmit = () => {
        setLoginInputs(username, password);
    };

//================ register logic ==================
	// const [{regSuccess, newUser}, setRegInputs]  = useRegister();

	// useEffect(()=>{
	// 	if (regSuccess){
	// 		auth.simpleCheck(username);
	// 	}
	// }, [regSuccess])

	const onCreate = ()=>{
		if (password === confirmPwd){
			// setRegInputs(username, password);
			usersContext.addUser(username, password)
		}

	}

    return (
        <div className="loggin-view">
            <div className="loggin-view-half loggin-grad-bg">
                <div className="loggin-back-button-container">
                    <div
                        className="loggin-back-button shadow-strong-cust"
                        onClick={() => props.history.goBack()}
                    >
                        <GoArrowSmallLeft className="loggin-back-button-icon" />
                    </div>
                    <span>Go back</span>
                </div>
                <img src={Office} className="loggin-img" alt="loggin" />
            </div>
            <div className="loggin-view-half">
                <div className="loggin-form-container">
                    {type === "CREATE" ? (
                        <>
                            <span>Create an account</span>
                            <InputField
                                title={"Username"}
                                placeholder={"Name"}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <InputField
                                title={"Password"}
                                placeholder={"8 characters"}
                                onChange={(e) => setPassword(e.target.value)}
                                hideText={true}
                            />
                            <InputField
                                title={"Confirm password"}
                                placeholder={"Confirm your password"}
                                onChange={(e) => setConfirmPwd(e.target.value)}
                                hideText={true}
                            />
                            <div className="loggin-switch-type">
                                Already have an account?
                                <div
                                    className="loggin-switch-type-link"
                                    onClick={toggleType}
                                >
                                    Sign In
                                </div>
                            </div>
                            <div className="loggin-input-submit rounded shadow-cust"
							onClick={onCreate}>
                                Create an account
                            </div>
                        </>
                    ) : (
                        <>
                            <span>Sign In</span>
                            <InputField
                                title={"Username"}
                                placeholder={"Name"}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <InputField
                                title={"Password"}
                                hideText={true}
                                placeholder={"8 characters"}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="loggin-switch-type">
                                <div
                                    className="loggin-switch-type-link"
                                    onClick={toggleType}
                                >
                                    Create a new account
                                </div>
                            </div>
                            <div
                                className="loggin-input-submit rounded shadow-cust"
                                onClick={onSubmit}
                            >
                                Sign In
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Loggin);
