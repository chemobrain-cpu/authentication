require('dotenv').config()
const express = require("express");
const body = require("body-parser");
const app = express();
app.use(express.static("public"));
const path = require("path")
const ejs = require("ejs")
const passport = require("passport")

const md = require("md5")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const passwordUtils = require("./config/passwordUtil.js").generatePassword
//const data = require(__dirname +"/data.js")
//const GridFsStorage = require("multer-gridfs-storage")
//const Grid = require("gridfs-stream")
//const methodOverride = require("method-override")
//const encrypt = require("mongoose-encrypt")
//app.use(methodOverride("_method"))


//working with passport to implement session cookies
//importing  all necessary packages

//requiring the mongo package
const mongoose = require("mongoose");

//const passportLocalMongoose = require("passport-local-mongoose")

//what to use in our express store

app.use(body.urlencoded({extended:true}))
app.use(body.json());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs")


 //database configuration
 const database = require("./config/databaseConfig")


 
  //session store implementation
const session = require("express-session")
//configuring MongStore to create store for session
const MongStore = require("connect-mongo")(session)

const conn = process.env.CONN
const sessionStore = new MongStore({
    mongooseConnection:mongoose.createConnection(conn,{useNewUrlParser:true,
    useUnifiedTopology:true}),
    collection:"sessions",
})


//setting express to use  the session
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    name:"precious",
    genid:function(){
        return "prechy"
    },
    cookie:{
        maxAge:100000
    },
    store:sessionStore,
    
    
}))

//configuring the passport module
require("./config/passportConfig")




//initialise our passport on every session i.e at every route request
app.use(passport.initialize())
////passport to use session since our app uses persistent login session
app.use(passport.session())//be sure to check out the passport 


app.route("/")
.get(function(req,res){
    res.render("homepage.ejs")
});

app.get("/secret",function(req,res){
         
        console.log(req.user)
       
        if(req.isAuthenticated()){
            res.render("secret")
        }
        
    }
)
app.get("/secrets",function(req,res){   
 
    console.log(req.user)
       
    if(req.isAuthenticated()){
        res.render("secret")
    }else{
        res.json({"message":"unauthorize acess"})
    }
    

    
})
//chaining the post route
app.route("/register")
.get(function(req,res){
    res.render("register.ejs")
})
.post(function(req,res){
        const User = database.User

        const user = new User({
        username:req.body.email,
        salt:crypto.randomBytes(32).toString("hex"),
        hash:crypto.pbkdf2Sync(req.body.password,"hi",10000,64,"sha512").toString("hex")
    })
    user.save()
    res.redirect("/secrets")

});

//chaining login route 
app.route("/login")
.get(function(req,res){
    res.render("login.ejs")
})
.post(passport.authenticate("local",{successRedirect:"/secrets"}));
    
app.get("/logout",function(req,res){
    req.logout()
 res.send("you have logged out")
})
app.get("/profile",function(req,res){
    res.render("profile")
})






app.listen(4000,()=>{
    console.log("app started on port 4000")
})