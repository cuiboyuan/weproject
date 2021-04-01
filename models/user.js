
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true
	}, 
	password: {
		type: String,
		required: true
	},

    isAdmin :{
        type: Boolean,
        required: true
    },

    description: {
        type: String,
        default: ""
    },
    skills:{
        type: [String],
        default: []
    },
    experiences:{
        type: [
            {
				company: String,
				position: String,
				start: String,
				end: String,
            }
        ],
        default: []
    },
    email:{
        type: String,
        default: ""
    },
    linkedin:{
        type: String,
        default: ""
    },
    github:{
        type: String,
        default: ""
    },

    ownedProjectIds: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },

    joinedProjectIds: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },

    appliedProj: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },

    //if it is topped by admin
    topped: {
        type: Boolean,
        default: false
    },


    connections:  {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },

    //the applicants 
    pending:  {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },

});


const User = mongoose.model('User', UserSchema);

module.exports = { User };
