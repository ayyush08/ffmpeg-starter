import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
const app = express();


//multer middleware
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log("File destination is being set");
        cb(null, "./fileUploads")
    },
    filename: function(req, file, cb){
        console.log("File name is being set");
        cb(null, file.fieldname+"-"+uuidv4()+path.extname(file.originalname))
    }
})

//multer configuration

const upload = multer({
    storage: storage,
})//now our this object is completely capable of handling file uploads


app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:8000"],
    credentials: true
}))

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*"); //not recommended
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");// Allow Headers is for the headers that the client can send, Origin is the domain that can access the server, X-Requested-With is for the request type, Content-Type is for the type of data that is being sent, Accept is for the type of data that the client can accept, Authorization is for the token that is being sent
    next();
})
app.use(express.json());//allow json data to be sent
app.use(express.urlencoded({extended:true}));//allow url encoded data to be sent


app.use("/fileUploads", express.static("fileUploads"));//allow access to the fileUploads folder


app.get("/", (req, res) => {
    
    res.json({ message: "Hello World" });
})


app.post("/upload", upload.single("file"),function(req, res){
    console.log("File uploaded successfully");
    res.json({message:"File uploaded successfully"});
})


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})




