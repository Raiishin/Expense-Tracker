import express from "express";
import routes from "./routes/index.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/", routes); //to use the routes

app.listen(port, function () {
	console.log("Application Started at: " + port);
});
