const { ObjectID } = require("mongodb");
const { mongoose } = require("../db/mongoose");
const { Project } = require("../models/project");
const { upload_image, get_images } = require("../tools/image.js");
const log = console.log;

var express = require("express");
var router = express.Router();
const multipart = require("connect-multiparty");
const { User } = require("../models/user");
const multipartMiddleware = multipart();
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
        res.status(200).send({ id: newProject._id });
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
        .then((result) => {
            if (result.n === 0) {
                res.status(404).send("Project not found");
            } else if (result.ok) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal server error");
            }
        })
        .catch((error) => {
            res.status(500).send("Internal server error");
        });
});

router.patch("/project/:id", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        res.status(500).send("Internal server error");
        return;
    }
    req.body.images = req.body.images.map(img => img.id);
    try {
        var project = await Project.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true, useFindAndModify: false }
        );
        if (!project) {
            res.status(404).send("Project not found!");
        } else {
            console.log(project);
            res.status(200).json(project);
        }
    } catch (err) {
        log(err);
        res.status(500).send("Internal Server error");
        return;
    }
});

router.post("/project/:id/images", multipartMiddleware, async (req, res) => {
    var project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404).send("Project not found!");
    } else {
        const promise = upload_image(req);
        promise.then(async (result) => {
            const image_id = result.id;
            project.images.push(image_id);
            const proj = await project.save();
            
            res.status(200).json(proj);
        });
        
    }
});

router.get("/project/:id/images", async (req, res) => {
    var project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404).send("Project not found!");
    } else {
        const promise = get_images(project.images);
        promise.then(async (result) => {
            console.log(result);
            res.status(200).json(result);
        });
        
    }
});

router.get("/project/top/:projectID", async (req, res) => {
    try {
        const projectID = req.params.projectID;
		console.log(projectID)
        const project = await Project.findById(projectID);
		console.log("1!!!",project)
        if (!project){
			res.status(404).send("projet not found")
		}
        project.topped = !project.topped;
        await project.save();
        res.send();
    } catch (err) {
        
		res.status(404).send(err)

	}
});


router.post("/project/like", async (req, res)=>{
    
    try{
        
        const project_ID = req.body.project_ID
        const userName = req.body.userName
        const project = await Project.findById(project_ID)
        console.log("project", project)
        const user = await User.findOne({userName: userName})
        console.log('user', user)
        if (!project || !user){
            res.status(404).send("proejct / user wrong")
        }
        project.usersLiked.push(userName)
        await project.save()
        res.send()
    }catch(err){
        console.log(err)
        res.status(404).send(err)
    }
})

module.exports = router;
