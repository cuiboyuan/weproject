'use strict'

const mongoose = require('mongoose');
const Image = require('./image');

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
        type: Object,
        // default: [],
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
    },
    images: {
        type: [String],
        default: [],
    }
});



const Project = mongoose.model("Project", ProjectSchema);

module.exports = { Project };
