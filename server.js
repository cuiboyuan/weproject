"user strict";

/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
const TEST_USER_ID = '5fb8b011b864666580b4efe3' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
const TEST_USER_EMAIL = 'test@user.com'
//////



const path = require('path');
const express = require('express');

const app = express();

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');

const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}


// ==================parts for middlewares ==========================

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (env !== 'production' && USE_TEST_USER)
        req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}



// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: env === 'production' ? MongoStore.create({
                                                mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/StudentAPI'
                                 }) : null
    })
);




/* API Routes */


// A route to login and create a session
app.post("/api/login", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    // log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUnamePassword(userName, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.userName = user.userName; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            //send back the user info  
            res.send(user);
        })
        .catch(error => {
            res.status(400).send()
        });
});

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
app.delete("/api/deleteUser/:username", (req, res) => {
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
app.patch("/api/updateProfile/:username", (req, res) => {
    // TODO: Add session checks
	if (mongoose.connection.readyState != 1){
		res.status(500).send('Internal server error')
		return;
	}

    const profileData = ['description', 'skills', 'experiences', 'email', 'linkedin', 'github'];

    User.findOne({userName: req.params.username})
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


app.use(express.static(path.join(__dirname, "/client/build")));


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});