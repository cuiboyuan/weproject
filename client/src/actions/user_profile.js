

const API_HOST = "http://localhost:5000"// change it afterwards

export const getProfile = async (app) => {
    
    const url = `${API_HOST}/api/user`;

    let { auth, allUsers, allProjects, location } = app.props;
    
    // Change to EXTERNAL CALL in phase 2:
    // const loginName = auth.userName;
    let loginName;
    try {
        const res = await fetch(`${API_HOST}/api/check-session`);
        if (res.status !== 200){
            return res.status;
        }
        const body = await res.json();
        loginName = body.currentUser;
    } catch (error) {
        return 500;
    }

    let currentName, currentUser, loginUser,isProfile,ownedProjects,joinedProjects;
    let isFriend, requested;
    try {
        const res = await fetch(`${url}/${loginName}`);
  
        if (res.status !== 200){
            return res.status;
        }
        const login = await res.json()

        isProfile = false;
        loginUser = login;
        
        
        if (location.pathname === "/profile") {
            currentName = loginUser.userName;
            currentUser = loginUser;
            isProfile = true;
            isFriend = true;
            requested = false;
        } else {
            // need some change
            const curName = location.state.data.userName;
            
            const response = await fetch(`${url}/${curName}`)

            if (response.status !== 200){
                return response.status;
            }
            const user = await response.json();

            currentUser = user;
            currentName = user.userName;

            isFriend = loginUser.connections.includes(currentName);
            requested = currentUser.pending.includes(loginName);

            console.log(currentUser)
        }

        // change afterwards
        ownedProjects = allProjects.projects.filter(
            item => item.owner.userName == currentName
        );
        joinedProjects = allProjects.projects.filter(
            item => item.userIds.includes(currentUser._id)
        );
        
        let friends = [];
        let pendings = [];

        for (let name of currentUser.connections) {
            try {
                const res = await fetch(`${url}/${name}`);
                if (res.status === 200){
                    const friend = await res.json();
                    friends.push(friend);
                } else if (res.status === 404){
                    continue;
                } else {
                    return res.status;
                }
            } catch (error) {
                return 500;
            }
        }
        
        for (let name of currentUser.pending) {
            try {
                const res = await fetch(`${url}/${name}`);
                if (res.status === 200){
                    const friend = await res.json();
                    pendings.push(friend);
                } else if (res.status === 404){
                    continue;
                } else {
                    return res.status;
                }
            } catch (error) {
                return 500;
            }
        }

        app.setState({
            id: currentUser._id,
            userName: currentName,
            loginName: loginName,
            
            // avatar: currentUser.avatar,
            description: currentUser.description,
            email: currentUser.email,
            linkedin: currentUser.linkedin,
            github: currentUser.github,
            skills: currentUser.skills,

            experiences: currentUser.experiences,

            ownedProjects: ownedProjects,
            joinedProjects: joinedProjects,

            isAdmin: loginUser.isAdmin,
            isProfile: isProfile,

            pending: pendings,
            connections: friends,

            isFriend : isFriend,
            requested: requested,
        });
        return 200;

    } catch (error) {
        return 500;
    }
};



export const updateProfile = async (app) => {
    
    const url = `${API_HOST}/api/updateProfile`;

    let { auth, allUsers, allProjects, location } = app.props;

    // Change to EXTERNAL CALL in phase 2:
    // const loginName = auth.userName;
    
    try {
        const res = await fetch(`${url}`, {
            method: "PATCH",
            body: JSON.stringify(app.state),
            headers: {
                'Content-Type': "application/json"
            }
        });
  
        if (res.status !== 200){
            return res.status;
        }

        console.log(await res.json())

        return 200;
        
    } catch (error) {
        return 500;
    }
};


export const deleteProfile = async (app) => {
    
    const url = `${API_HOST}/api/deleteUser`;

    // TODO: change this to check session afterwards
    const isAdmin = app.state.isAdmin;
    if (!isAdmin){
        return 403;
    }
    
    const username = app.state.userName;
    
    try {
        const res = await fetch(`${url}/${username}`, {
            method: "DELETE",
        });
  
        if (res.status !== 200){
            return res.status;
        }

        console.log(await res.json())

        return 200;
        
    } catch (error) {
        return 500;
    }
}

export const reply = async (app, friend, accept) => {
    const url = `${API_HOST}/connections/reply`;
    const friendName = friend.userName;

    try {
        const res = await fetch(`${url}/${friendName}`,{
            method: "PATCH",
            body: JSON.stringify({accept: accept}),
            headers: {
                'Content-Type': "application/json"
            }
        })
        if (res.status !== 200){
            return res.status;
        } else {
            return 200;
        }
    } catch (error) {
        return 500;
    }
}


export const connect = async (app) => {
    const url = `${API_HOST}/connections/request`;

    const username = app.state.userName;

    try {
        const res = await fetch(`${url}/${username}`,{
            method: "POST",
        })
        if (res.status !== 200){
            return res.status;
        }
        return 200;
    } catch (error) {
        return 500;
    }
}

export const removeFriend = async (app, friend) => {
    const url = `${API_HOST}/connections/remove`;

    const friendName = friend.userName;

    try {
        const res = await fetch(`${url}/${friendName}`,{
            method: "DELETE",
        })
        if (res.status !== 200){
            return res.status;
        }
        return 200;
    } catch (error) {
        return 500;
    }

}