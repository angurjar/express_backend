const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const { upload } = require("../middlware/upload");

const userController = require("./controller");
const { validate } = require("../middlware/validator");
const { registerSchema, loginSchema } = require("../validation/schema");

router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);
router.get(
  "/profile",
  auth.extractToken,
  auth.verifyToken,
  userController.getProfile
);
// router.post('/userpasswordChnage',userController.userpasswordForget);
router.post("/upload", upload.single("file"), userController.handleFormData);
router.post("/upload-url", userController.handleUploadUrl);
router.post("/forget-password", userController.forgetpassword);
router.get("/", userController.userList);
router.post("/delete", userController.userdelete);
router.post("/update", userController.userupdate);

router.get("/password/redirect", userController.resetPasswordRedirect);

module.exports = router;
