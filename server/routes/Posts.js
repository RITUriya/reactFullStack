const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
module.exports = router;
var app = express();

// ADD THIS
var cors = require("cors");
app.use(cors());
router.get("/", async (req, res) => {
	//	res.send("Hello World");
	const listOfPosts = await Posts.findAll();
	res.json(listOfPosts);
});

router.post("/", async (req, res) => {
	const post = req.body;
	await Posts.create(post);
	res.json(post);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const post = await Posts.findByPk(id);
	res.json(post);
});
module.exports = router;
