const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    }
})

//Signup static function
userSchema.statics.signup = async function(email, password){
    
    //validations
    if(!email || !password) {
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Enter valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Enter strong password")
    }

    const exist = await this.findOne({email})

    if(exist){
        throw Error("Email already exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user;

}

//login user
userSchema.statics.login = async function(email, password){

    //validation
    if(!email || ! password)throw Error("All fields should be filled")
    
    const user = await this.findOne({email})
if(!user)throw Error("NO user found with this email")

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error("Password is not correct")
    }

    return user;
}

module.exports = mongoose.model('user', userSchema)