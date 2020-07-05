const express = require("express")
const app = express()
const crypto = require("crypto")
const passport = require("passport")


app.route("/")
.get(function(req,res){
    res.render("homepage.ejs")
});

app.get("/secret",function(req,res,next){if(req.isAuthenticated()){next()}},function(req,res){
         
        console.log(req.user)
       // req.session.destroy(function(err){
       //     if(!err){
       //         console.log("session destroyed")
       //     }
       // })
        //console.log(req.session.id)
        res.render("secret")
    }
)
app.get("/secrets",function(req,res,next){if(req.isAuthenticated()){next()}},function(req,res){      
    console.log(req.user)
   // req.session.destroy(function(err){
   //     if(!err){
   //         console.log("session destroyed")
   //     }
   // })
    //console.log(req.session.id)
    res.render("secret")
})
//chaining the post route
app.route("/register")
.get(function(req,res){
    res.render("register.ejs")
})
.post(function(req,res){
    let hashh = []
   
        const User = database.User
        const user = new User({
        username:req.body.email,
        salt:crypto.randomBytes(32).toString("hex"),
        hash:crypto.pbkdf2Sync(req.body.password,"hi",10000,64,"sha512").toString("hex"),
    })
    user.save()
    res.redirect("/secret")

});

//chaining login route 
app.route("/login")
.get(function(req,res){
    res.render("login.ejs")
})
.post(passport.authenticate("local",{successRedirect:"/secrets"}))
    
   
 

app.get("/logout",function(req,res){
    req.logout;
    console.log(req.session)
    console.log(req.user)
    res.redirect("/")
})











