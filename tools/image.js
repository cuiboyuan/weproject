const { ObjectID } = require("mongodb");
const { mongoose } = require("../db/mongoose");
const { Project } = require("../models/project");
const { Image } = require("../models/image");
const log = console.log;

var express = require("express");
var router = express.Router();
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

const cloudinary = require("cloudinary");
// TODO: HIDE THE KEYS !!!!!!!!!
cloudinary.config({
	cloud_name: "we-project",
	api_key: "732875357253976",
	api_secret: "ma-99VpRxG_qHWma5E9h3bLO1Po",
});

const get_images = images => {
	let promise = new Promise((resolve, reject) => {
        Image.find({ image_id: { $in: images } })
			.then(res => resolve(res))
			.catch(error => reject(error));
	});
	return promise;
};

const upload_image = req => {
	return new Promise((resolve, reject) =>
		cloudinary.uploader.upload(
			req.files.file.path, // req.files contains uploaded files
			result => {
				console.log(result);
                var img = new Image({
					image_id: result.public_id,
                    image_url: result.url,
                    image_name: req.files.file.originalFilename,
					created_at: new Date(),
				});
				img
					.save()
					.then(res => resolve({ id: result.public_id }))
					.catch(err => reject(err));
			}
		)
	);
};

module.exports = { upload_image, get_images };
