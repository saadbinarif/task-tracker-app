
const userModel = require("../models/userModel")
const userModelp = require("../models/postgresModels/userModelp")
const jwt = require('jsonwebtoken')
const transporter = require('../mail-config');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator')
const otpGenerator = require('otp-generator')


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

//---- /auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;


  const user = await userModel.findOne({ email })
  if (!user) return res.status(404).json({ error: 'Invalid email or password' })

  if (user.isEmailVerified == false) {
    // res.redirect('/auth/verify-email')
    return res.status(404).json({ error: "please verify your email first" })
  } else {
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: "Invalid password" })

    if (user.isTwoFA) {
      const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 2); // Link expires in 2 minutes
      const otpExpiryTime = expiryDate;

      const sendMail = await transporter.sendMail({
        from: "<robertsmithrs97@outlook.com>",
        to: email,
        subject: 'OTP For Verification',
        text: `This OTP will expire in 2 minutes. Please enter this OTP to login: ${otp}`
      });
      if (!sendMail) {
        return res.status(502).json({ error: "bad_gateway: wasn't able to send email at this time" })
      }
      user.otp = otp;
      user.otpExpiryTime = otpExpiryTime;
      await user.save();
      return res.status(400).json({ message: "OTP required" })

    }



    const token = createToken(user._id);
    res.status(200).json({ message: 'Login successful', token })
  }



}

//---- /auth/signup
const signupUser = async (req, res) => {
  const { u_name, email, password } = req.body;


  const user = await userModel.signup(u_name, email, password)
  const token = createToken(user._id)


  return res.status(200).json({ u_name, email, token })


}

//---- /auth/verify-email
const verifyEmail = async (req, res) => {



  const { linkemail, linktoken, expiry } = req.query;
  const user = await userModel.findOne({ email: linkemail, linkToken: linktoken })
  if (!user) return res.status(404).json({ error: "not a valid link" })

  //if email is already verified redirect to login page else login user
  if (user.isEmailVerified) {
    return res.status(209).json({ error: "email already verified" })
  } else {
    const currentTimestamp = new Date().getTime()
    if (currentTimestamp > user.expiryTimestamp) {
      return res.status(410).json({ error: "Link has been expired" })
    }
    user.isEmailVerified = true;
    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ msg: "Verification successful", token })

  }




}

//----/auth/resend-link
const resendLink = async (req, res) => {
  const { email } = req.body

  if (!email) return res.status(400).json({ error: "Email required" })
  if (!validator.isEmail(email)) res.status(400).json({ error: "Invalid Email" })

  const user = await userModel.findOne({ email })
  if (!user) res.status(404).json({ error: "User not found" })

  const currentTimestamp = new Date().getTime();

  if (currentTimestamp < user.expiryTimestamp) {
    return res.status(409).json({ error: "Error 409 - conflict: Link already sent" })
  }
  if (user.isEmailVerified) return res.status(409).json({ error: "email already verified" })
  const linkToken = uuidv4();
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 2); // Link expires in 2 minutes
  const expiryTimestamp = expiryDate.getTime();
  const verificationLink = `http://localhost:4000/auth/verify-email?linkemail=${email}&linktoken=${linkToken}&expiry=${expiryTimestamp}`;

  const sendMail = await transporter.sendMail({
    from: "<robertsmithrs97@outlook.com>",
    to: email,
    subject: 'Resend: Verification Link for Login',
    text: `This link will expire in 2 minutes. Please verify your email by clicking on this link: ${verificationLink}`
  });
  if (!sendMail) {
    return res.status(502).json({ error: "bad_gateway: wasn't able to send email at this time" })
  }
  user.linkToken = linkToken;
  user.expiryTimestamp = expiryTimestamp
  await user.save()
  return res.status(200).json({ message: "link sent" })



}

//verify otp
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;


  const user = await userModel.findOne({ email })
  if (!user) return res.status(404).json({ msg: "user not found" })
  const currentTimestamp = new Date();

  if (currentTimestamp > user.otpExpiryTime) {
    return res.status(410).json({ error: "The otp is expired" })
  }
  if (user.otp === otp) {
    // user.otp = null
    // user.otpExpiryTime = null
    // await user.save();
    const token = createToken(user._id);
    return res.status(200).json({ msg: "Verification successful", token })
  }
  return res.status(401).json({ error: "Invalid otp" })











}


//-------------------- postgres controllers -------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

const loginUserPosgres = async (req, res) => {
  const { email, password } = req.body;


  // Perform user login using your Sequelize model method
  const user = await userModelp.login(email, password);

  // Create token
  const token = createToken(user.id); // Assuming your user model has an 'id' field

  // Respond with email and token
  return res.status(200).json({ email, token });

};

const signupUserPosgres = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Perform user signup using your Sequelize model method
    const user = await userModelp.signup(email, password);

    // Create token
    const token = createToken(user.id); // Assuming your user model has an 'id' field

    // Respond with email and token
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  loginUser,
  signupUser,
  loginUserPosgres,
  signupUserPosgres,
  verifyEmail,
  resendLink,
  verifyOTP
}

