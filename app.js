const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser"); 
const userRouter = require('/Users/ishika/Downloads/Aveksha-master/router/userRouter.js');
const viewRouter = require('/Users/ishika/Downloads/Aveksha-master/router/ViewRouter.js');

app.use(cookieParser());
app.use( express.json());
app.use(express.static(__dirname+"/public"));
app.set("views" , path.join(__dirname,"views"));

app.set("view engine" , "ejs");


app.use("",viewRouter)
app.use("/user",userRouter);


let port = process.env.PORT || 3000
app.listen(port, function () {
    console.log("server started at port 3000...");
  });