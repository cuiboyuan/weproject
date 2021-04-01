"user strict";

const path = require('path');
const express = require('express');

const app = express();

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');

/* API Routes */

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

// route to update user profile
app.patch("/api/updateProfile/:username", async (req, res) => {
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