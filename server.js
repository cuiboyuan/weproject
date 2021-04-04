"user strict";

const path = require('path');
const express = require('express');

const app = express();

const session = require("express-session");

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    

    if (req.session.userId) {
        User.findById(req.session.userId).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}


// Middleware to check whether user is a admin
const adminCheck = (req, res, next) => {
 
    if (req.session.userId) {
        User.findById(req.session.userId).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                if (user.isAdmin){
                    next()
                } else {
                    res.status(403).send("Forbidden")
                }
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

const env = process.env.NODE_ENV

app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        // store: env === 'production' ? MongoStore.create({
        //                                         mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/WeProjectAPI'
        //                          }) : null
    })
);

/* API Routes */

app.post('/api/login', (req, res) => {
    
    const username = req.body.userName;
    const password = req.body.password;

    User.findOne({userName: username, password: password})
        .then(user => {
            req.session.userId = user._id;
            req.session.user = user.userName; 
            res.send({ currentUser: req.session.user });
        })
        .catch(error => {
            res.status(400).send()
        });
})


app.get('/api/logout', (req, res) => {
    
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
})

app.get('/api/check-session', (req, res) => {
    
    if (req.session.user) {
        res.send({ currentUser: req.session.user });
    } else {
        res.status(401).send();
    }
    
})

// route to get user profile
app.get("/api/user/:username", (req, res) => {
    
	if (mongoose.connection.readyState != 1){
		res.status(500).send('Internal server error')
		return;
	}

    const username = req.params.username;
	
	User.findOne({userName: username})
    .then((user) => {
        if (!user){
            res.status(404).send('User not found')
            return;
        }
		res.send(user);
	}).catch((error) => {
		res.status(500).send("Internal server error")
	})
})

// route to create a new user
app.post("/api/newUser", (req, res) => {
    
	if (mongoose.connection.readyState != 1){
		res.status(500).send('Internal server error')
		return;
	}
	
	const newUser = new User({
		userName: req.body.userName,
		password: req.body.password,
		isAdmin: req.body.isAdmin,
	});

	newUser.save()
	.then((result) => {
		res.send(result)
	}).catch((error) => {
		res.status(400).send("Bad Request")
	})
})

// route to delete a user
app.delete("/api/deleteUser/:username", adminCheck, (req, res) => {
    // TODO: add a middleware to check for admin

    if (mongoose.connection.readyState != 1){
		res.status(500).send('Internal server error')
		return;
	}

    const username = req.params.username;
	
	User.deleteOne({userName: username})
    .then((result) => {
        if (result.n === 0){
            res.status(404).send("user not found")
        } else if (result.ok){
            res.send(result);
        } else {
		    res.status(500).send("Internal server error")
        }
	}).catch((error) => {
		res.status(500).send("Internal server error")
	})
})

// route to update user profile
app.patch("/api/updateProfile", authenticate, (req, res) => {
    // TODO: Add session checks
	if (mongoose.connection.readyState != 1){
		res.status(500).send('Internal server error')
		return;
	}

    const username = req.session.user;

    const profileData = ['description', 'skills', 'experiences', 'email', 'linkedin', 'github'];

    User.findOne({userName: username})
    .then((user) => {
        if (!user){
            res.status(404).send('User not found')
            return;
        }
        console.log(req.body);
        
        profileData.forEach((name) => {
            if (req.body[name]){
                user[name] = req.body[name];
            }
        })

        user.save()
        .then(result => {
            res.send(result);
            console.log(`${user['userName']} updated`)
        }).catch(err => {
            res.status(400).send("bad request")
            return;
        })
        
        
    }).catch((err) => {
		res.status(500).send("Internal Server error")
        return;
    })
    
})

app.patch("/connections/reply/:username", authenticate, async (req,res) => {
    // TODO: Add session checks
	if (mongoose.connection.readyState != 1){
		res.status(500).send('Internal server error')
		return;
	}

    const username = req.session.user;
    const friendName = req.params.username;
    try {
        const user = await User.findOne({userName: username});
        if (!user){
            res.status(404).send('User not found')
            return;
        }
        if (!user.pending.includes(friendName)){
            res.status(404).send('User not found')
            return;
        } else {
            user.pending.remove(friendName);
        }
        if (req.body.accept){
            if (!user.connections.includes(friendName)){
                user.connections.push(friendName);


                const friend = await User.findOne({userName: friendName})

                if (!friend){
                    res.status(404).send('User not found')
                    return;
                }
                friend.connections.push(username);
                await friend.save();
            }
        }
        await user.save();
        console.log(`connection accepted`)
        res.send(friendName)
        
    } catch (error) {
		res.status(500).send("Internal Server error")
        return;
        
    }
    
})


app.post("/connections/request/:username", authenticate, (req,res) => {
    // TODO: Add session checks
	if (mongoose.connection.readyState != 1){
		res.status(500).send('Internal server error')
		return;
	}

    const username = req.session.user;
    const friendName = req.params.username;

    User.findOne({userName: friendName})
    .then((user) => {
        if (!user){
            res.status(404).send('User not found')
            return;
        }

        if (!user.pending.includes(username)){
            user.pending.push(username);
        }

        user.save()
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send("bad request")
            return;
        })
        
        
    }).catch((err) => {
		res.status(500).send("Internal Server error")
        return;
    })
})

app.delete("/connections/remove/:username", authenticate, async (req, res) => {
    
    if (mongoose.connection.readyState != 1){
		res.status(500).send('Internal server error')
		return;
	}

    const username = req.session.user;
    const friendName = req.params.username;
    try {
        const user = await User.findOne({userName: username});
        if (!user){
            res.status(404).send('User not found')
            return;
        }

        if (user.connections.includes(friendName)){
            user.connections.remove(friendName);


            const friend = await User.findOne({userName: friendName})

            if (!friend){
                res.status(404).send('User not found')
                return;
            }
            friend.connections.remove(username);

            await friend.save();
            await user.save();
            
            console.log(`connection accepted`)
        } else {
            res.status(404).send('User not found')
        }
        res.send(friendName)

        
    } catch (error) {
		res.status(500).send("Internal Server error")
        return;
        
    }
})


app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // // check for page routes that we expect in the frontend to provide correct status code.
    // const goodPageRoutes = ["/", "/teammates", "/dashboard"];
    // if (!goodPageRoutes.includes(req.url)) {
    //     // if url not in expected page routes, set status to 404.
    //     res.status(404);
    // }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});