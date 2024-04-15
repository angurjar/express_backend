const bcrypt = require("bcrypt");
const User = require("./model");
const auth = require("../auth/auth");
const {transporter}=require('../config/config.js')

const multer = require("multer");
const { createPresignedUrl } = require("../utils/s3");
// const cloudinary = require("../utils/cloudanry");

exports.register = async (req, res) => {
  try {
    const { id, username, password, memberid, user_code,files,image_attached,email } = req.body;

    if (
      id === undefined &&
      username === undefined &&
      password === undefined &&
      memberid === undefined &&
      user_code === undefined &&
      files===undefined &&
      image_attached===undefined &&
      email===undefined 
    
    ) {
      console.log(
        "All data is null:",
        id,
        username,
        password,
        memberid,
        user_code,
        files,
        image_attached,
        email
      );
    }

    const user = await User.create({
      id,
      username,
      password: await bcrypt.hash(password, 3),
      memberid,
      user_code,
      files,
      email,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    auth.generateToken({ id: user.id }, (err, token) => {
      // Corrected usage of generateToken
      if (err) {
        console.error("Error:", err);
        res.json({ message: "Something went wrong", token });
      } else {
        console.log("Generated token:", token);
        res.json({ message: "Login successful", token });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getProfile = async (req, res) => {
  const id = req.auth.user.id;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    res.status(401).json({ message: "unauthorized" });
    console.log("user is not find");
  }
  res.status(200).json(user);
  console.log("user is  find");
};

exports.handleFormData = async (req, res) => {
  try {
    console.log(req.file);
    res.status(201).json({message: 'Uploaded'})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.handleUploadUrl = async (req, res) => {
  try {
    const url = await createPresignedUrl(req.query.key);
    res.status(201).json({ uploadUrl: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgetpassword=async(req,res)=>{
  const { email } = req.body;
  console.log(email)
try {

  
  
    if (!email) {
      console.log()
      return res.status(400).json({ msg: "Email is required" });
    }
  
    const user = await User.findOne({ where: { email } });
  console.log(user)
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
   
   
  
  
  
    const info = await transporter.sendMail({
      from: process.env.sender_email,
      to: email, // Use the provided email here instead of hardcoding
      subject: "Password reset link ✔",
      text: "Here is your password reset link", // Provide the actual password reset link here
      html: "<b>Hello world?</b>",
    });
  
    res.status(200).json({ msg: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" }); // Use status code 500 for internal server errors
  }
}