import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRouters from "./routers/UserRouters.js";
import bodyParser from "body-parser";

dotenv.config();
mongoose.connect(process.env.SERVER_MONGO);
app.use(express.static("public"));
const PORT = process.env.SERVER_PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", UserRouters);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Hello from in 😁");
});
