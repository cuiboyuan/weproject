'use strict'

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    id: {
        type: String,
        // required: true,
    },
    owner: {
        type: Object,
        // required: true,
    },
    name: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    requirement: {
        type: String,
        default: "",
    },
    userIds: {
        type: [String],
        default: [],
    },
    status: {
        type: String,
        default: "incomplete",
    },
    usersLiked: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    progress: {
        type: Array,
        default: [],
    },
    topped: {
        type: Boolean,
        default: false,
    },
    members: {
        type: [String],
        default: [],
    },
    applicants: {
        type: [String],
        default: [],
    }
});

// // find user by userName and password
// UserSchema.statics.findByUnamePassword = function(userName, password) {
// 	const User = this // binds this to the User model

// 	// First find the user by their email
// 	return User.findOne({ userName: userName }).then((user) => {
// 		if (!user) {
// 			return Promise.reject()  // a rejected promise
// 		}
// 		// if the user exists, make sure their password is correct
// 		return new Promise((resolve, reject) => {
// 			bcrypt.compare(password, user.password, (err, result) => {
// 				if (result) {
// 					resolve(user)
// 				} else {
// 					reject()
// 				}
// 			})
// 		})
// 	})
// }


const Project = mongoose.model("Project", ProjectSchema);

module.exports = { Project };
