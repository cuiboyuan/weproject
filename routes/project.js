const { ObjectID } = require("mongodb");
const { mongoose } = require("../db/mongoose");
const { Project } = require("../models/project");
const log = console.log;

var express = require("express");
var router = express.Router();
// project api
router.get("/projects", async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		res.status(500).send("Internal server error");
		return;
	}
	try {
		const result = await Project.find();
		console.log(result);
		res.status(200).json(result);
	} catch (err) {
		log(err);
		res.status(500).send("Internal Server error");
		return;
	}
});

router.post("/project", async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		res.status(500).send("Internal server error");
		return;
	}
	try {
		const newProject = new Project(req.body);
		const result = await newProject.save();
		res.status(200).json(result);
	} catch (err) {
		log(err);
		res.status(500).send("Internal Server error");
		return;
	}
});

router.delete("/project/:id", (req, res) => {
	if (mongoose.connection.readyState != 1) {
		res.status(500).send("Internal server error");
		return;
	}
	Project.deleteOne({ id: req.params.id })
		.then(result => {
			if (result.n === 0) {
				res.status(404).send("Project not found");
			} else if (result.ok) {
				res.send(result);
			} else {
				res.status(500).send("Internal server error");
			}
		})
		.catch(error => {
			res.status(500).send("Internal server error");
		});
});

module.exports = router;
