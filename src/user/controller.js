const bcrypt = require("bcrypt");
const User = require("./model");
const auth = require("../auth/auth");
const { transporter } = require("../config/config.js");

const multer = require("multer");
const { createPresignedUrl } = require("../utils/s3");
// const cloudinary = require("../utils/cloudanry");

exports.register = async (req, res) => {
  try {
    const {
      id,
      username,
      password,
      memberid,
      user_code,
      files,
      image_attached,
      email,
    } = req.body;

    if (
      id === undefined &&
      username === undefined &&
      password === undefined &&
      memberid === undefined &&
      user_code === undefined &&
      files === undefined &&
      image_attached === undefined &&
      email === undefined
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

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = await User.create({
      id,
      username,
      password: hashedPassword, // Use hashed password
      memberid,
      user_code,
      files,
      email,
    });

    auth.generateToken({ id: user.id }, (err, token) => {
      if (err) {
        console.error("Error:", err);
        res.json({ message: "Something went wrong", token });
      } else {
        console.log("Generated token:", token);
        res.json({ message: "register successful", token });
      }
    });
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
    res.status(201).json({ message: "Uploaded" });
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

exports.forgetpassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    if (!email) {
      console.log();
      return res.status(400).json({ msg: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const link = `http://localhost:3001/api/v1/user/password/redirect?id=${user.id}`;
    const info = await transporter.sendMail({
      from: process.env.sender_email,
      to: email, // Use the provided email here instead of hardcoding
      subject: "Password reset link ✔",
      text: "Here is your password reset link", // Provide the actual password reset link here
      html: `<b>Hello world?</b> <a href="${link}">${link}</a>`,
    });

    res.status(200).json({ msg: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" }); // Use status code 500 for internal server errors
  }
};

exports.userList = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const data = await User.findAll({});
  try {
    if (!data) {
      res.status(404).json({ msg: "data is not found" });
    } else {
      res.status(200).json({ msg: "data is  found", data });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userdelete = async (req, res) => {
  const id = req.body.id;
  try {
    const count = await User.destroy({ where: { id } });
    if (count === 0) {
      return res.status(400).json({ msg: "user not found " });
    }
    res.status(200).json({ msg: "user delete successfully" });
  } catch (error) {
    console.error(error);
  }
};

exports.userupdate = async (req, res) => {
  const { id, email, username, password } = req.body;

  try {
    const [count] = await User.update(
      { email, username, password },
      { where: { id } }
    );
    if (!count) {
      return res.status(400).json({ msg: "user is not update succesfully" });
    }
    return res.status(400).json({ msg: "user updated succesfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.resetPasswordRedirect = async (req, res) => {
  const id = req.query.id;
  // either send this id to react or generate a token then send that to react
  res.redirect(`http://localhost:3000/password/reset?id=${id}`);
};
