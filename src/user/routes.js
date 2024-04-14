
const express = require('express');
const router = express.Router();
const auth=require('../auth/auth')
const { upload } = require('../middlware/upload')


const userController = require('./controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth.extractToken, auth.verifyToken, userController.getProfile);
// router.post('/userpasswordChnage',userController.userpasswordForget);
router.post('/upload', upload.single('file'), userController.handleFormData)
router.post('/upload-url', userController.handleUploadUrl);



module.exports = router;


