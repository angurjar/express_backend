const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const { upload } = require("../middlware/upload");

const userController = require("./controller");
const { validate } = require("../middlware/validator");
const { registerSchema, loginSchema } = require("../validation/schema");

router.post("/users", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);
router.get(
  "/users/:userId/",
  auth.extractToken,
  auth.verifyToken,
  userController.getProfiles
);
// router.post('/userpasswordChnage',userController.userpasswordForget);
router.post("/upload", upload.single("file"), userController.handleFormData);
router.post("/upload-url", userController.handleUploadUrl);
router.post("/forget-password", userController.forgetpassword);
router.get("/users", userController.userList);
router.delete("/users/userId", userController.userdelete);
router.patch("/users/:userId", userController.userupdate);
router.put("/users/userId", userController.userupdate);

router.get("/password/redirect", userController.resetPasswordRedirect);

module.exports = router;
