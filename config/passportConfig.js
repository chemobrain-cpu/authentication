require('dotenv').config()
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const database = require("./databaseConfig")
const passwordUtils = require("./passwordUtil.js")
const bcrypt = require("bcrypt")
const User = (database.User)
let saltRounds = (process.env.SALTROUNDS)
const md5 = require("md5")
const crypto = require("crypto")
const customFields = {
    usernameField:"email",
    passwordField:"password"
}
const verifycallback = (username,password,done) =>{
    User.findOne({username:username})
    .then((user)=>{
        //do something
        if(!user){
            return done(null,false)
        }else{ 
       //  console.log(user.password)
            var salt = crypto.randomBytes(32).toString("hex");
            var genHash = crypto.pbkdf2Sync(password,"hi",10000,64,"sha512").toString("hex")
            if(user.hash == genHash){
                console.log("hi")
                return done(null,user)
            
            }
    
          
        }

    }).catch((err)=>{
        if(err){
        //console.log(err)
        }
    })
}


const strategy = new localStrategy(customFields,verifycallback);

//passport.config
passport.use(strategy)

//what this mthod does:it get the id of the user from the database and set a new property/key called passport within the request session and set its value to the "id" gotten
passport.serializeUser(function(user,done){
    console.log("done")
    done(null,user.id)
})

//what this method does:depending on that ID,this method goes to grab the user so that passport middle ware can be able to populete the req.user with the user
passport.deserializeUser((userId,done)=>{
    User.findById(userId)
    .then((user)=>{
        done(null,user)
    }).catch((err)=>{
        done(err)
    })
})
