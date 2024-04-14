const bcrypt = require("bcrypt");
const User = require("./model");
const auth = require("../auth/auth");

const multer = require("multer");
const { createPresignedUrl } = require("../utils/s3");
// const cloudinary = require("../utils/cloudanry");

exports.register = async (req, res) => {
  try {
    const { id, username, password, memberid, user_code } = req.body;

    if (
      id === null &&
      username === null &&
      password === null &&
      memberid === null &&
      user_code === null
    ) {
      console.log(
        "All data is null:",
        id,
        username,
        password,
        memberid,
        user_code
      );
    }

    const user = await User.create({
      id,
      username,
      password: await bcrypt.hash(password, 3),
      memberid,
      user_code,
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


  

// exports.cloudinary = async (localpath) => {
//   try {
//     if (!localpath) {
//       return res.status(404).json({ message: "not found" });
//       const reposnse = await cloudinary.uploader.upload("loacalfilepath", {
//         resourcetype: "auto",
//       });
//       console.log("file upload", response.url);
//       return reposnse;
//     }
//   } catch (error) {
//     FileSystem.unlinksync(localpath);
//     console.log(error);
//   }
// };


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