'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true, unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        required: true,
    },

    description: {
        type: String,
        default: "",
    },
    skills: {
        type: [String],
        default: [],
    },
    experiences: {
        type: [
            {
                company: String,
                position: String,
                start: String,
                end: String,
            },
        ],
        default: [],
    },
    email: {
        type: String,
        default: "",
    },
    linkedin: {
        type: String,
        default: "",
    },
    github: {
        type: String,
        default: "",
    },

    ownedProjectIds: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },

    joinedProjectIds: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },

    appliedProj: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },

    //if it is topped by admin
    topped: {
        type: Boolean,
        default: false,
    },

    connections: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },

    //the applicants
    pending: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
});


//to make sure we store the hashed password
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})


// find user by userName and password
UserSchema.statics.findByUnamePassword = function(userName, password) {
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ userName: userName }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}


const User = mongoose.model("User", UserSchema);

module.exports = { User };
