const userModel = require("../models/userModel");
const userModelp = require("../models/postgresModels/userModelp");
const jwt = require("jsonwebtoken");
const transporter = require("../mail-config");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");
const otpGenerator = require("otp-generator");

const createToken = (_id, expiry = "3d") => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: expiry });
};

const generateOTP = () => {
  return otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

const sendEmailWithContent = (email, subject, content) => {
  // Implement your asynchronous email sending logic here
  transporter.sendMail({
    from: "<robertsmithrs97@outlook.com>",
    to: email,
    subject: subject,
    text: content,
  })
  .then(() => console.log("Email sent successfully"))
  .catch(error => console.error("Error sending email:", error));
};
//---- /auth/login
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await userModel.findOne({ email });
//   if (!user)
//     return res.status(404).json({ error: "Invalid email or password" });

//   if (user.isEmailVerified == false) {
//     // res.redirect('/auth/verify-email')
//     return res.status(404).json({ error: "please verify your email first" });
//   } else {
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ error: "Invalid password" });

//     if (user.isTwoFA) {
//       const otp = otpGenerator.generate(6, {
//         lowerCaseAlphabets: false,
//         upperCaseAlphabets: false,
//         specialChars: false,
//       });
//       const expiryDate = new Date();
//       expiryDate.setMinutes(expiryDate.getMinutes() + 2); // Link expires in 2 minutes
//       const otpExpiryTime = expiryDate;

//       const sendMail = await transporter.sendMail({
//         from: "<robertsmithrs97@outlook.com>",
//         to: email,
//         subject: "OTP For Verification",
//         text: `This OTP will expire in 2 minutes. Please enter this OTP to login: ${otp}`,
//       });
//       if (!sendMail) {
//         return res.status(502).json({
//           error: "bad_gateway: wasn't able to send email at this time",
//         });
//       }
//       user.otp = otp;
//       user.otpExpiryTime = otpExpiryTime;
//       await user.save();
//       return res.status(400).json({ message: "OTP required" });
//     }

//     const token = createToken(user._id);
//     res.status(200).json({ message: "Login successful", token });
//   }
// };

// 

const loginUser = async (req, res) => {
  
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password').exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password", success:false });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({ message: "Please verify your email first", success:false });
    }
    console.log(new Date())
    if(user.otp && user.otpExpiryTime > new Date().getTime()) {
      return res.status(400).json({message:"Enter the OTP sent to your email"})
    }

    if (user.isTwoFA && user.otpExpiryTime < new Date().getTime()) {
      const otp = generateOTP();
      const otpExpiryTime = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

      // Send email and save OTP asynchronously
      const subject = 'OTP for verification'
     const emailContent = `This OTP will expire in 2 minutes. Please enter this OTP to login: ${otp}`
      sendEmailWithContent(email, subject, emailContent);

      user.otp = otp;
      user.otpExpiryTime = otpExpiryTime;
      await user.save();

      return res.status(400).json({ message: "OTP required" });
    }

    const token = createToken(user._id);
    return res.status(200).json({ message: "Login successful", token });
  
};


//---- /auth/signup
// const signupUser = async (req, res) => {
//   const { u_name, email, password } = req.body;

//   const user = await userModel.signup(u_name, email, password)
//   const token = createToken(user._id)

//   return res.status(200).json({ u_name, email, token })

// }

const signupUser = async (req, res) => {
  const { u_name, email, password } = req.body;

  const user = await userModel.signup(u_name, email, password);
  
  const linkToken = createToken(user._id, "2m");
  const verificationLink = `http://localhost:3000/auth/verify-email/${linkToken}`;
  const subject = 'Link for verification'
  const content = `This link will expire in 2 minutes. Please verify your email by clicking on this link: ${verificationLink}`

  sendEmailWithContent(user.email, subject, content)

  return res.status(200).json({ linkToken, message: "link sent to email", success: true });
};

//---- /auth/verify-email
// const verifyEmail = async (req, res) => {
//   const { linkemail, linktoken, expiry } = req.query;
//   const user = await userModel.findOne({
//     email: linkemail,
//     linkToken: linktoken,
//   });
//   if (!user) return res.status(404).json({ error: "not a valid link" });

//   //if email is already verified redirect to login page else login user
//   if (user.isEmailVerified) {
//     return res.status(209).json({ error: "email already verified" });
//   } else {
//     const currentTimestamp = new Date().getTime();
//     if (currentTimestamp > user.expiryTimestamp) {
//       return res.status(410).json({ error: "Link has been expired" });
//     }
//     user.isEmailVerified = true;
//     await user.save();
//     const token = createToken(user._id);
//     res.status(200).json({ msg: "Verification successful", token });
//   }
// };

const verifyEmail = async (req, res) => {
  const { linkToken } = req.params;
  
  jwt.verify(linkToken, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Link is either invalid or expired",
        success: false,
      });
    }

    const userId = decoded._id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    if (user.isEmailVerified) {
      return res.status(400).json({
        message: "email is already verified",
        success: true,
      });
    } else {
      user.isEmailVerified = true;
      
    }
    await user.save();
      const token = createToken(user._id);
      return res.status(200).json({
        token,
        message: "Email successfully verified",
        success: true,
      });
  });
};

//----/auth/resend-link
const resendLink = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required", success: false });
  if (!validator.isEmail(email))
    res.status(400).json({ message: "Invalid Email", success: false});

  const user = await userModel.findOne({ email });
  if (!user) res.status(404).json({ message: "User not found", success: false });

  const currentTimestamp = new Date().getTime();

  if (currentTimestamp < user.expiryTimestamp) {
    return res
      .status(409) //conflict
      .json({ message: "Link already sent", success: false });
  }
  if (user.isEmailVerified)
    return res.status(409).json({ message: "email already verified" });
  const linkToken = uuidv4();
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 2); // Link expires in 2 minutes
  const expiryTimestamp = expiryDate.getTime();
  const verificationLink = `http://localhost:4000/auth/verify-email?linkemail=${email}&linktoken=${linkToken}&expiry=${expiryTimestamp}`;

  const sendMail = await transporter.sendMail({
    from: "<robertsmithrs97@outlook.com>",
    to: email,
    subject: "Resend: Verification Link for Login",
    text: `This link will expire in 2 minutes. Please verify your email by clicking on this link: ${verificationLink}`,
  });
  if (!sendMail) {
    return res
      .status(502)
      .json({ message: "bad_gateway: wasn't able to send email at this time" });
  }
  user.linkToken = linkToken;
  user.expiryTimestamp = expiryTimestamp;
  await user.save();
  return res.status(200).json({ message: "link sent" });
};

//verify otp
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ msg: "user not found" });
  const currentTimestamp = new Date();

  if (currentTimestamp > user.otpExpiryTime) {
    return res.status(410).json({ error: "The otp is expired" });
  }
  if (user.otp === otp) {
    // user.otp = null
    // user.otpExpiryTime = null
    // await user.save();
    const token = createToken(user._id);
    return res.status(200).json({ msg: "Verification successful", token });
  }
  return res.status(401).json({ error: "Invalid otp" });
};

// auth/forgot-password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const token = createToken(user._id, "1h");

  const sendMail = await transporter.sendMail({
    from: "<robertsmithrs97@outlook.com>",
    to: email,
    subject: "Password Reset",
    text: `To reset your password, click on the following link: http://localhost:4000/auth/reset-password/${token}`,
  });
  if (!sendMail) {
    return res
      .status(502)
      .json({ error: "bad_gateway: wasn't able to send email at this time" });
  }
  return res
    .status(200)
    .json({ message: "Reset link has been sent to your email" });
};

//auth/reset-password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    const userId = decoded._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;
    await user.save();

    return res.status(200).json({ message: "Password reset successful." });
  });
};

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
  verifyOTP,
  forgotPassword,
  resetPassword,
};
