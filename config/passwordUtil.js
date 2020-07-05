const bcrypt = require("bcrypt")
const database = require("./databaseConfig.js")
const User = (database.User)

const validatePassword = function(password,hash,salt){
    bcrypt.hash(password,salt,function(err,encrypedString){
        compare = encrypedString == hash
        return compare
    })
}
const generatePassword = function(password,salt){
    bcrypt.hash(password,salt,function(err,encrypedString){
        return encrypedString
    })
}
exports.validatePassword = validatePassword;
exports.generatePassword = generatePassword