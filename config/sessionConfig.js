const session = require("express-session")
const mongoose = require("mongoose")
const express = require("express")
const app = express()

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

