const express = require("express");
const { isLoggedIn } = require("../controller/userController");
const { getLoginPage, getRegister, getAveska, getContact, getLanding, getstats, getProfile, getList } = require("../controller/ViewController");


const viewRouter = express.Router();
viewRouter.use(isLoggedIn);

viewRouter.route("/").get(getLanding);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getRegister);
viewRouter.route("/about").get(getAveska);
viewRouter.route("/contact").get(getContact);
viewRouter.route("/stats").get(getstats);
viewRouter.route("/profile").get(getProfile);
viewRouter.route("/list").get(getList);

module.exports = viewRouter;