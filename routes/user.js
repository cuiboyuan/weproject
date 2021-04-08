const { mongoose } = require("../db/mongoose");
const { User } = require("../models/user");
const { upload_image, get_images } = require("../tools/image");
const log = console.log;

var express = require("express");
var router = express.Router();
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

router.post("/user/:userName/images", multipartMiddleware, async (req, res) => {
	var user = await User.findOne({userName: req.params.userName});
	if (!user) {
		res.status(404).send("User not found!");
	} else {
		const promise = upload_image(req);
		promise
            .then(async result => {
				const image_id = result.id;
				user.avatar = image_id;
                const u = await user.save();
				res.status(200).json(u);
			})
			.catch(error => console.error(error));
	}
});

router.get("/user/:userName/images", async (req, res) => {
    var user = await User.findOne({userName: req.params.userName});
	if (!user) {
		res.status(404).send("Project not found!");
	} else {
		const promise = get_images([user.avatar]);
		promise
            .then(async result => {
                console.log(result);
				res.status(200).json(result);
			})
			.catch(error => console.error(error));
	}
});

module.exports = router;
