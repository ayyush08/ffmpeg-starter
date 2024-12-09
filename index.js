import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { exec } from "child_process"; // not recommended to use in production
import { stderr, stdout } from "process";


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
    const lessonId = uuidv4();
    const videoPath = req.file.path; // ffmpeg library needs this path
    const outputPath = `./fileUploads/lessons/${lessonId}`

    const hlsPath = `${outputPath}/index.m3u8` // m3u8 file is a UTF-8 encoded playlist file. These files are plain text files that can be used to store the URL paths of streaming media files and information about the media tracks.
    console.log("HLS Path: ", hlsPath);

    // Suppose the output path does not exist
    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath, {recursive: true});
    }

    // ffmpeg command - all optimization is done here
    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;
    // no queue because of POC, not recommended for production
    exec(ffmpegCommand,(error,stdout,stderr)=>{
        if(error){
            console.log("exec error: ", error);
            return;
        }
        console.log("stdout: ", stdout);
        console.log("stderr: ", stderr);

        const videoUrl = `http://localhost:5000/fileUploads/lessons/${lessonId}/index.m3u8`; //to be saved in the database

        res.json({
            message: "Video converted to HLS format",
            videoUrl: videoUrl,
            lessonId: lessonId
        }).status(200);
    })

})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})




