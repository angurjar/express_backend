import Router from "express"
export const router = Router();
import * as auth from '../auth/auth.js'
import {upload} from '../middlware/upload.js';
import * as userController from './controller.js';
import {validate} from '../middlware/validator.js';
// import registerSchema from '../validation/schema'

router.post("/register",  userController.register);
router.post("/login",  userController.login);
router.get(
  "/users/:userId/",
  auth.extractToken,
  auth.verifyToken,
  userController.getProfile
);
// router.post('/userpasswordChnage', userController.forgetpassword);
// router.post("/upload", upload.single("file"), userController.handleFormData);
// router.post("/upload-url", userController.handleUploadUrl);
// router.post("/forget-password", userController.forgetpassword);
// router.get("/users", userController.userList);
// router.delete("/users/userId", userController.userdelete);
// router.patch("/users/:userId", userController.userupdate);
// router.put("/users/userId", userController.userupdate);

// router.get("/password/redirect", userController.resetPasswordRedirect);


