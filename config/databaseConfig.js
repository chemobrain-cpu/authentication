const mongoose = require("mongoose")
 //mongoose to connect our server to database
 const conn = process.env.CONN
  mongoose.connect(conn,{useNewUrlParser:true,
 useUnifiedTopology:true});
  mongoose.set("useCreateIndex",true)
  
  const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    hash:{
        type:String
    },
    salt:{
      type:String
    }
});


//creating a model based on that schema
const User = new  mongoose.model("User",userSchema);
module.exports.User = User
