const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser"); 
const userRouter = require('../router/userRouter.js');
const viewRouter = require('../router/userRouter.js');

app.use(cookieParser());
app.use( express.json());
app.use(express.static(__dirname+"/public"));
app.set("views" , path.join(__dirname,"views"));

app.set("view engine" , "ejs");

app.use("",viewRouter)
app.use("/user",userRouter);


// let port = process.env.PORT || 3000
// app.listen(port, function () {
//     console.log("server started at port 3000...");
//   });

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log("Express is working on port ${port}");
});