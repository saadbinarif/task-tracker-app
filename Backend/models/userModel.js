const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const transporter = require('../mail-config');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema

const userSchema = new Schema({

    u_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },
    isTwoFA: {
        type: Boolean,
        default: true

    },
    otp: {
        type: Number,
        default: null
    },
    otpExpiryTime: {
        type: Date,
        default: null
    },
    linkToken: {
        type: String,
        default: null,
        unique: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    expiryTimestamp: {
        type: Date
    }
})

//Signup static function
// userSchema.statics.signup = async function (u_name, email, password) {

//     //validations
//     if (!u_name || !email || !password) {
//         throw Error("All fields must be filled")
//     }
//     if (!validator.isEmail(email)) {
//         throw Error("Enter valid email")
//     }
//     // if (!validator.isStrongPassword(password)) {
//     //     throw Error("Enter strong password")
//     // }

//     const exist = await this.findOne({ email })

//     if (exist) {
//         throw Error("Email already exist")
//     }

//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, salt)

//     const linkToken = uuidv4();
//     const expiryDate = new Date();
//     expiryDate.setMinutes(expiryDate.getMinutes() + 2); // Link expires in 2 minutes
//     const expiryTimestamp = expiryDate.getTime();
//     const verificationLink = `http://localhost:4000/auth/verify-email?linkemail=${email}&linktoken=${linkToken}&expiry=${expiryTimestamp}`;

//     const sendMail = await transporter.sendMail({
//         from: "<robertsmithrs97@outlook.com>",
//         to: email,
//         subject: 'Verification Link for Login',
//         text: `This link will expire in 2 minutes. Please verify your email by clicking on this link: ${verificationLink}`
//     });
//     if (!sendMail) {
//         return res.status(502).json({ error: "bad_gateway: wasn't able to send email at this time" })
//     }

//     const user = await this.create({ u_name, email, password: hash, linkToken, expiryTimestamp } )

//     return user;

// }

userSchema.statics.signup = async function (u_name, email, password) {

    //validations
    if (!u_name || !email || !password) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Enter valid email")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Enter strong password")
    }

    const exist = await this.findOne({ email })

    if (exist) {
        throw Error("Email already exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ u_name, email, password: hash, } )

    return user;

}




    


    

    

    
// }

module.exports = mongoose.model('user', userSchema)