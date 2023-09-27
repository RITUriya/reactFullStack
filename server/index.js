//https://www.youtube.com/watch?v=pJx-HGwaL3w&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=2

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("../server/models");

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

//Routers
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);

// server will run on
db.sequelize.sync().then(() => {
	app.listen(3001, () => {
		console.log("server running on 3001");
	});
});
