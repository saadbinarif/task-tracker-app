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
    linkToken: {
        type: String,
        default: null,
        unique: true
    },
    linkTokenUsed: {
        type: Boolean,
        default: false
    }
})

//Signup static function
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

    const linkToken = uuidv4();
    const verificationLink = `http://localhost:4000/auth/login?linkemail=${email}&linktoken=${linkToken}`;

    const sendMail = await transporter.sendMail({
        from: "<naeemali1996@outlook.com>",
        to: email,
        subject: 'Verification Link for Login',
        text: `This link will expire in 2 minutes. Please verify your email by clicking on this link: ${verificationLink}.`
    });
    if (!sendMail) {
        return res.status(502).json({ error: "bad_gateway: wasn't able to send email at this time" })
    }

    const user = await this.create({ u_name, email, password: hash, linkToken } )

    return user;

}

//login user
// userSchema.statics.login = async function (email, password, linkToken) {

    
//         const user = await this.findOne({ email, linkToken })
//         if (!user) throw Error("Email is not registered")

//         const match = await bcrypt.compare(password, user.password)
//         if (!match) {
//             throw Error("Password is not correct")
//         }

//         if (user.linkTokenUsed) {
//             return res.status(400).json({ message: 'Token already used' });
//         }

//         // Mark token as used
//         user.linkTokenUsed = true;
//         await user.save();
        
    
//         //validation
//         if (!email || !password) throw Error("All fields should be filled")

//         user = await this.findOne({ email })
//         if (!user) throw Error("NO user found with this email")

       
    
        
//     return user;
//     }

    


    

    

    
// }

module.exports = mongoose.model('user', userSchema)