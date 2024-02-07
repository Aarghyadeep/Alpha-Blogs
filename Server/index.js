const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const multer = require('multer');
const path = require("path");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const port = process.env.PORT || 5000;


//middlewares
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use("/images",express.static(path.join(__dirname,"/images")));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

 
//database
mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("Db connection successful!");
}).catch((err)=>{
    console.log(err.msg);
});

//image upload
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded successfully!")
})


app.listen(port,()=> {
      console.log(`Server running on port ${process.env.PORT}`);
});