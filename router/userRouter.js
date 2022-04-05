const express = require("express");
const { signup, login, logout, updateDetails, makeAdmin, updateProfilePhoto, getAllUser, changeAccess, removeAccess } = require("/Users/ishika/Downloads/Aveksha-master/controller/userController.js");
const userRouter = express.Router();

userRouter.post("/signup", signup );
userRouter.post("/login" , login);
userRouter.post("/logout",logout)
userRouter.get("/logout",logout)
userRouter.post("/update",updateDetails);
userRouter.post("/auth",makeAdmin);
userRouter.post("/updateprofilephoto", updateProfilePhoto)
userRouter.get("/getUser", getAllUser);
userRouter.post("/change",changeAccess);
userRouter.post("/remove",removeAccess);


module.exports = userRouter;