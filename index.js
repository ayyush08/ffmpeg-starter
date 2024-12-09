import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const app = express();



app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
})


app.listen(8000, () => {
    console.log("Server is running on port 8000");
})




