const jwt = require("jsonwebtoken");
// const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY = "xyz";
const userModel = require("/Users/ishika/Downloads/Aveksha-master/model/userModel.js");

async function signup(req, res) {
  try {
    let user = req.body;
    console.log("***");
    console.log(user);
    let newUser = await userModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      phone: user.phone,
      orgName: user.orgName,
      Designation: user.Designation
    });
    const token = jwt.sign({ id: newUser["_id"] }, SECRET_KEY);
    res.cookie("jwt", token, { httpOnly: true });

    res.status(201).json({
      message: "Succesfully Signed up !!",
      data: newUser,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to sign up !!",
      error,
    });
  }
}

async function login(req, res) {
  try {
    let { email, password } = req.body;
    let loggedInUser = await userModel.find({ email: email });
    if (loggedInUser.length) {
      let user = loggedInUser[0];
      if (user.password == password) {
        // token ban na chahie
        console.log(user.password);
        const token = jwt.sign({ id: user["_id"] }, SECRET_KEY);

        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).json({
          message: "Logged in succesfully !!",
          data: loggedInUser[0],
        });
        // res.redirect("/");
      } else {
        res.status(200).json({
          message: "Email and Password didn't Matched !!",
        });
      }
    } else {
      res.status(200).json({
        message: "No User Found SignUp First",
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Login Failed !!",
      error,
    });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("jwt");
    res.redirect("/");
  } catch (error) {
    res.status(501).json({
      error,
    });
  }
}

async function isLoggedIn(req, res, next) {
  try {
    let token = req.cookies.jwt;
    const payload = jwt.verify(token, SECRET_KEY);
    if (payload) {
      // logged in hai
      // console.log();
      let user = await userModel.findById(payload.id);
      req.name = user.name;
      req.role = user.role;
      req.user = user;
      next();
    } else {
      //logged in nhi hai
      next();
    }
  } catch (error) {
    next();
  }
}

async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    console.log("Inside protectRoute function");
    const payload = jwt.verify(token, SECRET_KEY);
    console.log(payload);
    if (payload) {
      req.id = payload.id;
      next();
    } else {
      res.status(501).json({
        message: "Please Log in !!",
      });
    }
  } catch (error) {
    res.status(501).json({
      message: "Please Log in !!",
      error,
    });
  }
}

async function updateDetails(req, res) {
  try {
    let user = await userModel.findById(req.user._id);
    for (key in req.body) {
      user[key] = req.body[key];
    }
    user.save({ validateBeforeSave: false });
    res.status(200).json({
      mess: "Successfully updated details",
      data: user
    })

  } catch (err) {
    res.status(500).json({
      mess: "failed to update",
    })
  }
}

async function makeAdmin(req,res){
  try{
    let user = await userModel.findById(req.body.id);
    user.role = "admin";
    user.save({ validateBeforeSave: false });
    res.status(200).json({
      mess: "Successfully updated authorization",
      data: user
    })
  }
  catch(err){
    res.status(500).json({
      mess: "failed to update access",
      data: changesObj
    })
  }
}

async function updateProfilePhoto(req, res) {
  try {
    let id = req.user._id;
    let user = await userModel.findById(id);
    user.pImage = req.body.imagePath;
    await user.save();
    res.json({
      message: "Profile Photo updated !!"
    })
  }
  catch (error) {
    res.status(200).json({
      message: "failed to update photo !!",
      error
    })
  }
}

async function getAllUser(req,res){
  try{
    let list = await userModel.find({}).sort({name: 1});
    for(let i=0;i<list.length;i++){
      list[i].password = ""; 
      list[i].phone = "";
      list[i].pImage = "";
    } 
    res.status(200).json({
      data:list
    })

  }catch(err){
    res.status(500).json({
      message: "failed to get list !!",
      error
    })
  }
}

async function changeAccess(req,res){
  try{
    let obj = await userModel.findById(req.body.id);
    obj.role = "admin";
    await obj.save();
    res.status(200).json({
      data:obj
    })

  }catch(err){
    res.status(500).json({
      message: "failed to change access !!",
      err
    })
  }
}
async function removeAccess(req,res){
  try{
    let obj = await userModel.findById(req.body.id);
    obj.role = "user";
    console.log("object");
    await obj.save();
    res.status(200).json({
      data:"obj"
    })

  }catch(err){
    res.status(500).json({
      message: "failed to change access !!",
      err
    })
  }
}


module.exports.signup = signup;
module.exports.login = login;
module.exports.logout = logout;
module.exports.protectRoute = protectRoute;
module.exports.isLoggedIn = isLoggedIn;
module.exports.makeAdmin = makeAdmin;
module.exports.updateDetails = updateDetails;
module.exports.updateProfilePhoto = updateProfilePhoto;
module.exports.getAllUser = getAllUser;
module.exports.changeAccess = changeAccess;
module.exports.removeAccess = removeAccess