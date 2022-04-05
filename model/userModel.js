const express = require("express");
const mongoose = require("mongoose");
// const Router = require("/Users/ishika/Downloads/Aveksha-master/router/userRouter.js")

const app = express();

app.use(express.json());
mongoose.connect('mongodb+srv://ishika2703:Ishika@6780@cluster0.wlkjw.mongodb.net/userDb?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// app.use(Router);

// app.listen(3000, () => {
//   console.log("Server is running at port 3000");
// });

let userSchema = new mongoose.Schema({
  name : {
    type:String,
    required:true
  },
  email : {
    type:String ,
    required:true,
    unique:true
  },
  password:{
    type:String,
    minlength:[6 , "Password must be greater than 6 characters"],
    required:true
  } ,
  confirmPassword:{
    type:String,
    minlength:[6 , "Password must be greater than 6 characters"],
    validate : {
      validator: function(){
        return this.password == this.confirmPassword;
      } ,
      message:"Password didn't matched !!"
    }
  },
  role:{
    type:String,
    default:"user"
  },
  pImage:{
    type:String,
    default:"../Images/Avatar07.png"
  },
  phone:{
      type:String,
      required:true
  },
  orgName:{
      type:String,
      required:true
  },
  Designation:{
      type:String,
      required:true
  }
 
})

userSchema.pre("save" , function(){
  this.confirmPassword = undefined;
})

const userModel = mongoose.model("userscollection" , userSchema);
module.exports = userModel;